/**
 * Helper methods used for the loyalty vouchers and their implementations.
 */
 var objectUtils = require('utils/object');
 var StringUtils = require('dw/util/StringUtils');
 var URLUtils = require('dw/web/URLUtils');
 var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
 var Money = require("dw/value/Money");
 var Logger = require('dw/system/Logger').getLogger('LoyaltyVoucherHelper', 'LoyaltyVoucherHelper');
 var LoyaltyResourceCaching = require('int_loyalty_apac/cartridge/scripts/loyalty/LoyaltyResourceCaching');
 
 var LoyaltyVoucherHelper = {
     /**
      * Returns user loyalty points 
      * @return {Number}
      */
     getUserBalance: function() {
         var profile = require('profile').get(customer.profile);
         var userInfo = profile.getValue('jsonData.userInfo');
         return Number(objectUtils.safeGet(userInfo, 'balance', 0));
     },
 
     /**
      * Returns voucher data based list, key and value
      * @return {String}
      */
     getVoucherData: function(voucherList, key, value) {
         if(!voucherList.empty) {
             return voucherList.vouchers.filter(function(e) {
                 return e[key] == value;
             });
         }
         return null;
     },
 
     /**
      * Returns vouchers catalogs contains list of vouchers configured in site preference loyaltyJSONData.voucherCatalog
      * @param {String} voucherImageType Voucher Image type - cart or dashboard
      * @return {Object}
      */
     createCatalog: function(voucherImageType) {
         var userBalance = this.getUserBalance();
         var voucherCatalog = require('configuration').getValue('loyaltyJSONData.voucherCatalog');
         var voucherItems = {
             empty: true,
             vouchers: []
         };
         if (voucherCatalog) {
             voucherItems.empty = false;
             voucherCatalog.forEach(function(event) {
                 var requiredLoyaltyPoints = Number(objectUtils.safeGet(event, 'requiredLoyaltyPoints', 0));
                 var buttonType = userBalance < requiredLoyaltyPoints ? 'earn' : 'claim';
                 voucherItems.vouchers.push({
                     voucherID: objectUtils.safeGet(event, 'voucherID', ''),
                     amount: getVoucherAmount(event.amount),
                     requiredPoints: objectUtils.safeGet(event, 'requiredLoyaltyPoints', ''),
                     type: buttonType,
                     eanCode: objectUtils.safeGet(event, 'eanCode', ''),
                     rewardCatalogID: objectUtils.safeGet(event, 'rewardCatalogID', ''),
                     image: getVoucherImage(event, buttonType, 'voucherCatalog', voucherImageType),
                     pointsAwayForClaim: buttonType == 'earn' ? getPointsAwayForClaim(requiredLoyaltyPoints, userBalance) : false
                 });
             });
             var termContent = require('content').get('loyalty-voucher-modal-term-condition');
             voucherItems.termContent = (termContent.object && termContent.isOnline()) ? termContent.getBody() : '';
         }
         return voucherItems;
     },
 
     /**
      * Returns active or available vouchers for the current user
      * @param {Boolean} checkCartEligibility calculate voucher cart eligibility if loyaltyVouchers is cached
      * @return {Object}
      */
     getAvailableVouchers: function(checkCartEligibility) {
         var voucherItems = {
             empty: true,
             vouchers: []
         };
         var cachedData = LoyaltyResourceCaching.getCachedData('loyaltyVouchers');
         var basket = require('basket').get(require('dw/order/BasketMgr').getCurrentOrNewBasket());
         var loyaltyHelper = require('int_loyalty_apac/cartridge/scripts/helpers/loyaltyHelper');
 
         if (!empty(cachedData)) {
             if (checkCartEligibility && cachedData.vouchers.length != 0) {
                 // recalculate cart eligibility if the voucherItems was cached
                 cachedData.vouchers.forEach(function(voucher) {
                     var voucherConfig = LoyaltyVoucherHelper.getVoucherConfig(voucher);
                     voucherConfig = voucherConfig.length ? voucherConfig[0] : null;
                     var voucherID = objectUtils.safeGet(voucher, 'voucherID', '');
                     voucher.appliedOnCart = loyaltyHelper.basketHasVoucher(basket, 'couponCode', voucherID),
                     voucher.checkQualifyingCart = loyaltyHelper.checkQualifyingCart(basket, voucherConfig)
                 });
             }
             voucherItems = cachedData;
         } else {
             var LoyaltyPageHelper = require('*/cartridge/scripts/loyalty/LoyaltyPageHelper');
             var HIPLoyaltyServiceHelper = require('*/cartridge/scripts/loyalty/HIPLoyaltyServiceHelper');
             var vouchers = HIPLoyaltyServiceHelper.getInquiryVouchers(customer.profile, require('configuration').getValue('loyaltyJSONData.programId'));
             if (vouchers.length != 0 && require('configuration').getValue('loyaltyJSONData.showAvailableVouchers')) {
                 vouchers.forEach(function(event) {
                     if (event.status == 'Available') {
                         var expiredAt = event.expirationDate ? LoyaltyPageHelper.getCalendarDate(event.expirationDate) : null;
                         var voucherConfig = LoyaltyVoucherHelper.getVoucherConfig(event);
                         var voucherID = objectUtils.safeGet(event, 'voucherId', '');
                         voucherConfig = voucherConfig.length ? voucherConfig[0] : null;
                         voucherItems.vouchers.push({
                             sortByDate: event.expirationDate ? LoyaltyPageHelper.getDateInstance(event.expirationDate) : null,
                             expiredAt: expiredAt,
                             voucherID: voucherID,
                             description: objectUtils.safeGet(event, 'description', ''),
                             sfccCouponID: objectUtils.safeGet(voucherConfig, 'couponID', ''),
                             voucherType: objectUtils.safeGet(voucherConfig, 'voucherType', ''),
                             reservationPageURL: objectUtils.safeGet(voucherConfig, 'reservationPageURL', ''),
                             voucherCategory: objectUtils.safeGet(voucherConfig, 'voucherCategory', ''),
                             image: getVoucherImage(voucherConfig, 'available', 'vouchers', null),
                             status: objectUtils.safeGet(event, 'status', ''),
                             appliedOnCart: loyaltyHelper.basketHasVoucher(basket, 'couponCode', voucherID),
                             checkQualifyingCart: loyaltyHelper.checkQualifyingCart(basket, voucherConfig),
                         });
                     }
                 });
 
                 if (voucherItems.vouchers.length == 0) {
                     voucherItems.empty = true;
                 } else {
                     voucherItems.empty = false;
                     voucherItems.vouchers = LoyaltyPageHelper.sortItemsActivities(voucherItems.vouchers);
                 }
             }
 
             LoyaltyResourceCaching.setCache('loyaltyVouchers', voucherItems);
         }
         return voucherItems;
     },
 
     getVoucherConfig: function(voucher) {
         var vouchersData = require('configuration').getValue('loyaltyJSONData.vouchers');
         var voucherList = {
             empty: vouchersData.length != 0 ? false : true,
             vouchers: vouchersData
         };
         return LoyaltyVoucherHelper.getVoucherData(voucherList, 'voucherType', voucher.voucherType); 
     },
     
     /**
      * Returns list of invalid/expired vouchers available.
      * @return {Object}
      */
     
     getInvalidVouchers: function(checkCartEligibility) {
         var voucherItems = {
                 empty: true,
                 vouchers: []
             };
             var cachedData = LoyaltyResourceCaching.getCachedData('invalidLoyaltyVouchers');
             var basket = require('basket').get(require('dw/order/BasketMgr').getCurrentOrNewBasket());
             var loyaltyHelper = require('int_loyalty_apac/cartridge/scripts/helpers/loyaltyHelper');
 
             if (!empty(cachedData)) {
                 if (checkCartEligibility && cachedData.vouchers.length != 0) {
                     // recalculate cart eligibility if the voucherItems was cached
                     cachedData.vouchers.forEach(function(voucher) {
                         var voucherID = objectUtils.safeGet(voucher, 'voucherID', '');
                         voucher.appliedOnCart = loyaltyHelper.basketHasVoucher(basket, 'couponCode', voucherID)
                     });
                 }
                 voucherItems = cachedData;
             } else {
                 var LoyaltyPageHelper = require('*/cartridge/scripts/loyalty/LoyaltyPageHelper');
                 var HIPLoyaltyServiceHelper = require('*/cartridge/scripts/loyalty/HIPLoyaltyServiceHelper');
                 var vouchers = HIPLoyaltyServiceHelper.getInquiryVouchers(customer.profile, require('configuration').getValue('loyaltyJSONData.programId'));
                 if (vouchers.length && require('configuration').getValue('loyaltyJSONData.showAvailableVouchers')) {
                     vouchers.forEach(function(event) {
                         if (event.status == 'Expired' || event.status == 'Used') {
                             var expiredAt = event.expirationDate ? LoyaltyPageHelper.getCalendarDate(event.expirationDate) : null;
                             var voucherID = objectUtils.safeGet(event, 'voucherId', '');
                             voucherItems.vouchers.push({
                                 sortByDate: event.expirationDate ? LoyaltyPageHelper.getDateInstance(event.expirationDate) : null,
                                 expiredAt: expiredAt,
                                 voucherID: voucherID,
                                 description: objectUtils.safeGet(event, 'description', ''),
                                 status: objectUtils.safeGet(event, 'status', ''),
                                 appliedOnCart: loyaltyHelper.basketHasVoucher(basket, 'couponCode', voucherID)
                             });
                         }
                     });
 
                     if (voucherItems.vouchers.length == 0) {
                         voucherItems.empty = true;
                     } else {
                         voucherItems.empty = false;
                         voucherItems.vouchers = LoyaltyPageHelper.sortItemsActivities(voucherItems.vouchers);
                     }
                 }
 
                 LoyaltyResourceCaching.setCache('invalidLoyaltyVouchers', voucherItems);
             }
 
             return voucherItems;
     },
 
     /**
      * Returns list of vouchers where are about to expire followed by available, claim and earn vouchers.
      * @return {Object}
      */
     getVoucherExpiring: function() {
         var voucherExpiring = {
             empty: true
         };
 
         // Case 1 Available Vouchers
         if (voucherExpiring.empty) {
             var availableVouchers = this.getAvailableVouchers(false);
             if (!availableVouchers.empty) {
                 var redeemRedirectURL = require('configuration').getValue('loyaltyJSONData.redeemVouchersRedirectURL');
                 voucherExpiring.empty = false;
                 voucherExpiring.type = "available";
                 voucherExpiring.vouchers = availableVouchers.vouchers;
                 voucherExpiring.redeemRedirectURL =  redeemRedirectURL ? URLUtils.url('Search-Show', 'cgid', redeemRedirectURL).toString() : URLUtils.home();
             }
         }
         var voucherCatalog = this.createCatalog();
         // Case 2 Claim Vouchers
         if (voucherExpiring.empty) {
             if (!voucherCatalog.empty) {
                 var claimVouchers = voucherCatalog.vouchers.filter(function(voucher) {
                     return voucher.type == 'claim';
                 });
                 if (claimVouchers.length != 0) {
                     voucherExpiring.empty = false;
                     voucherExpiring.type = "claim";
                     voucherExpiring.vouchers = claimVouchers;
                 }
             }
         }
 
         // Case 3 Earn Vouchers
         if (voucherExpiring.empty) {
             if (!voucherCatalog.empty) {
                 var earnVouchers = voucherCatalog.vouchers.filter(function(voucher) {
                     return voucher.type == 'earn';
                 });
                 if (earnVouchers.length != 0) {
                     voucherExpiring.empty = false;
                     voucherExpiring.type = "earn"
                     voucherExpiring.vouchers = earnVouchers;
                 }
             }
         }
         voucherExpiring.termContent = !voucherCatalog.empty ? voucherCatalog.termContent : '';
 
         return voucherExpiring;
     },
 
     /**
      * fetches the OCAPI access token before making any OCAPI calls.
      * @return {String}
      */
     getAccessToken: function() {
         var token = '';
         var serviceName = require('utils/service').getServiceID(require('pref').get('ocapi.service.token', ''));
         var serviceCredential = require('servicecredential').get(serviceName);
 
         if (empty(serviceCredential.getUser()) || empty(serviceCredential.getPassword())) {
             Logger.error('OCAPI getAccessToken user and password was not found in service {0}', serviceName);
             return '';
         }
 
         try {
             var authHeader = StringUtils.encodeBase64(serviceCredential.getUser() + ':' + serviceCredential.getPassword());
             var tokenService = LocalServiceRegistry.createService(serviceName, {
                 createRequest: function(service, request) {
                     service.addHeader("Content-Type", "application/x-www-form-urlencoded");
                     service.addHeader('Authorization', 'Basic ' + authHeader);
                     service.setRequestMethod("POST");
                     service.addParam('grant_type', 'client_credentials');
                     return request;
                 },
                 parseResponse: function(service, response) {
                     return response;
                 }
             });
 
             var serviceResponse = tokenService.call();
             var response = require('utils/object').safeGet(serviceResponse, 'object.text', '');
             var jsonData = require('utils/json').parse(response, {});
             token = jsonData['access_token'];
         } catch (e) {
             Logger.error('OCAPI getAccessToken failed error:{0}',  e.message);
         }
 
         return token;
     },
 
     /**
      * stores multiple codes based on provide params of couponID and coupon code.
      * @return {Object}
      */
     storeCouponCodeUsingOCAPI: function(params) {
         var ocapiResponse = {};
         var accessToken = this.getAccessToken();
 
         if (!accessToken) {
             return '';
         }
 
         try {
             var endpoint = "coupons/{0}/multiple_codes";
             var serviceName = require('utils/service').getServiceID(require('pref').get('ocapi.service.store.multicoupons', ''));
             var result = LocalServiceRegistry.createService(serviceName, {
                 createRequest: function(service, params) {
                     service.addHeader("Content-Type", "application/json");
                     service.addHeader('Authorization', 'Bearer ' + accessToken);
                     service.URL += StringUtils.format(endpoint, params.actionParams);
                     return JSON.stringify(params.bodyParams);
                 },
                 parseResponse: function(service, response) {
                     return response;
                 }
             }).call(params);
             return result;
         } catch (e) {
             Logger.error('OCAPI call store multiple codes execution failed and error:{0}',  e.message);
         }
         return ocapiResponse;
     }
 };
 
 /**
  * Returns number of points needed to claim the voucher.
  * @return {Number}
  */
 function getPointsAwayForClaim(requiredLoyaltyPoints, userBalance) {
     return Number(requiredLoyaltyPoints - userBalance);
 }
 
 /**
  * Returns voucher amount based on current session currency code.
  * @return {Number}
  */
 function getVoucherAmount(voucherAmount) {
     return new Money(voucherAmount, session.currency.currencyCode);
 }
 
 /**
  * Returns voucher image based site preference loyaltyJSONData
  * @param {Object} voucher voucher config from site preference loyaltyJSONData
  * @param {String} voucherType voucher type - claim or earn
  * @param {String} jsonDataField config field to use - voucherCatalog or availableVouchers
  * @param {String} voucherImageType Voucher Image type - cart or dashboard
  * @return {String} ImagePath
  */
 function getVoucherImage(voucher, voucherType, jsonDataField, voucherImageType) {
     var URLUtils = require('dw/web/URLUtils');
     var imagePath = null;
     if (voucher) {
         if (jsonDataField == 'voucherCatalog') {
             // fetching voucher images from configuration loyaltyJSONData.voucherCatalog
             if (voucherImageType == 'dashboard') {
                 // fetching voucher images based on voucher image type
                 imagePath = voucherType == 'claim' ? voucher.dashboard_claimImage : voucher.dashboard_earnImage;
             }
             if (voucherImageType == 'cart') {
                 imagePath = voucherType == 'claim' ? voucher.cart_claimImage : voucher.cart_earnImage;
             }
         }
         if (jsonDataField == 'vouchers') {
             // fetching voucher images from configuration loyaltyJSONData.vouchers
             imagePath = voucher.applyImage;
         }
     }
     return imagePath ? URLUtils.httpStatic(URLUtils.CONTEXT_LIBRARY, null, imagePath).toString() : null;    
 }
 
 module.exports = LoyaltyVoucherHelper;
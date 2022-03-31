let data = $(".swiper").data();
console.log(data);
var colors = [];
var index = 0;
$(".flavour-slide-layout-heading").text(data.slides + " " + data.heading);
var colorHolder = $(".flavour-slide-colors-holder");
colorHolder.each(function () {
  colors[index++] = $(this).data().color;
});

colorHolder.each(function () {
  for (let i = 0; i < colors.length; i++) {
    $(this).children().eq(i).css("background", colors[i]);
  }
});


setHeights = () ->
  leaflet = $(".angular-leaflet-map")
  console.log "Leaflet: #{leaflet}"
  console.log "Setting heights"
  leaflet.css("height","#{$(window).height()}")
  leaflet.css("width","#{$(window).width()}")

$(window).on "orientationchange resize", setHeights

app = angular.module("demoapp", ["leaflet-directive"])

app.controller "SimpleMapController", [ '$scope', setHeights  ]

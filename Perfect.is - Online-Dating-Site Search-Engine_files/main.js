
var count = 0;

$(document).ready(function () {


  $('.for-filters').click(function () {
    $('.filters').addClass('open')
    $('.cover-block').addClass('vis')
  });
  $('.close-filters').click(function () {
    $('.filters').removeClass('open')
    $('.cover-block').removeClass('vis')
  })
  $('.for-menu').click(function () {
    if ($(this).hasClass('active')) {
      $('.nav-menu').removeClass('open1')
      $(this).removeClass('active');
      $('.cover-block').removeClass('vis')
    } else {
      $('.nav-menu').addClass('open1');
      $(this).addClass('active');
      $('.cover-block').addClass('vis')
    }
  });
  $('.cover-block').click(function () {
    $('.filters').removeClass('open')
    $('.nav-menu').removeClass('open1')
    $('.for-menu').removeClass('active')
    $(this).removeClass('vis')
  });
  // for notyf
  var checkboxes1 = $('.filters [type = "checkbox"]')
  $(checkboxes1).each(function (index, value) {
    if ($(value).attr('checked')) {
      count++;
    }
  });
  var checkboxes2 = $('.filters .RadToggleButton')
  $(checkboxes2).each(function (index, value) {
    if ($(value).val() == 1) {
      count++;
    }
  });
  count += $('.filters .RadCheckBox span.p-i-checkbox-checked').length
  if (count != 0) {
    $('span.for-svg').append('<span class="notyf">' + count + '</span>')
  }
  // for notyf
  var forSrc = $('.for_post_block img:nth-child(1)')

  $(forSrc).each(function () {
    if (typeof $(this).attr('src') == "undefined") {
      $(this).addClass('default')
    }
  });
});

(function (global) {
    function OnClientValueChanged(slider, args) {
        // Show the tooltip only while the slider handle is sliding. In case the user simply clicks on the track of the slider to change the value
        // the change will be quick and the tooltip will show and hide too quickly.
        if (!isSliding) {
            return;
        }
        var tooltip = getTooltip();
        global.setTimeout(function () {
            updateToolTipText(tooltip, slider);
        }, 30);
    }

    var isSliding = false;
    function OnClientSlideStart(slider, args) {
        isSliding = true;
        showRadToolTip(slider);
    }

    function OnClientSlide(slider, args) {
        resetToolTipLocation(getTooltip());
    }

    function OnClientSlideRangeStart(slider, args) {
        isSliding = true;
        showRadToolTip(slider);
    }

    function OnClientSlideRange(slider, args) {
        resetToolTipLocation(getTooltip());
    }

    function OnClientSlideEnd(slider, args) {
        isSliding = false;
        getTooltip().hide();
    }

    function OnClientSlideRangeEnd(slider, args) {
        isSliding = false;
        getTooltip().hide();
    }

    function showRadToolTip(slider) {
        var tooltip = getTooltip();
        tooltip.set_targetControl($get("RadSliderSelected_" + slider.get_id()));
        resetToolTipLocation(tooltip);
        global.setTimeout(function () {
            updateToolTipText(tooltip, slider);
        }, 30);
    }

    function resetToolTipLocation(tooltip) {
        if (!tooltip.isVisible()) {
            global.setTimeout(function () {
                tooltip.show();
            }, 20);
        }
        else {
            tooltip.updateLocation();
        }
    }

    function updateToolTipText(tooltip, slider) {
        var div = document.createElement("div");
        div.style.whiteSpace = "nowrap";
        if (slider.get_itemType() == Telerik.Web.UI.SliderItemType.Item) {
            div.innerHTML = (slider.get_selectedItems()[0].get_text() + " / " + slider.get_selectedItems()[1].get_text());
        }
        else {
            div.innerHTML = (slider.get_selectionStart() + " / " + slider.get_selectionEnd());
        }

        tooltip.set_contentElement(div);
    }

    function geoLocation(dataFieldId) {
        if (navigator.geolocation) {
            var location_timeout = setTimeout("geoLocationFail()", 10000);
            navigator.geolocation.getCurrentPosition(function (position) {
                clearTimeout(location_timeout);
                geoLocationSubmit(position.coords.latitude + " " + position.coords.longitude)
            }, function (error) {
                clearTimeout(location_timeout);
                geoLocationFail();
            });
        } else {
            geoLocationFail();
        }
    }

    function geoLocationFail() {
        //alert('Please enable geo location for automatic city detection');
    }

    function locationChange(chkId, labelId, comboId, divId) {
        $('#' + chkId).hide();
        $('#' + labelId).hide();
        $('#' + divId).hide();
        $('#' + comboId).show();
        $('#' + comboId).removeClass('hidden');
    }

    function showImageOnSelectedItemChanging(sender, eventArgs) {
        var input = sender.get_inputDomElement();
        input.style.background = "url(" + eventArgs.get_item().get_imageUrl() + ") no-repeat 0% 50%";
    }

    function showSelectedItemImage(sender) {
        var input = sender.get_inputDomElement();
        input.style.background = "url(" + sender.get_selectedItem().get_imageUrl() + ") no-repeat 0% 50%";
    }

    global.OnClientValueChanged = OnClientValueChanged;
    global.OnClientSlideStart = OnClientSlideStart;
    global.OnClientSlide = OnClientSlide;
    global.OnClientSlideRangeStart = OnClientSlideRangeStart;
    global.OnClientSlideRange = OnClientSlideRange;
    global.OnClientSlideEnd = OnClientSlideEnd;
    global.OnClientSlideRangeEnd = OnClientSlideRangeEnd;
    global.geoLocation = geoLocation;
    global.geoLocationFail = geoLocationFail;
    global.locationChange = locationChange;
    global.showImageOnSelectedItemChanging = showImageOnSelectedItemChanging;
    global.showSelectedItemImage = showSelectedItemImage;
})(window);

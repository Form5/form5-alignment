(function() {
  'use strict';
  window.form5 = window.form5 || {};
  window.form5.alignment = {
    $window: $(window),
    debug: false,

    runSquare: false,
    runEqualize: false,
    runVerticalCenter: false,
    runFullWindowHeight: false,

    verticalAbsolute: {
      'margin-top': 'auto',
      'margin-bottom': 'auto',
      'position': 'absolute',
      'top': '0',
      'bottom': '0'
    },

    verticalStatic: {
      'position': '',
      'margin-top': '',
      'margin-bottom': '',
      'top': '',
      'bottom': '',
      'height': ''
    },
    square: function(attribute) {
      this.runSquare = attribute;
      var windowWidth = window.innerWidth || this.$window.width();

      $('[' + attribute + ']').each($.proxy(function(index,element){
        var $element = $(element),
            options = $element.data('options'),
            newHeight = $element.outerWidth();

        if (typeof options === 'undefined') {
          $element.data('options',this.parceOptions($element.attr(attribute)));
          options = $element.data('options');
          $element.attr(attribute,'');
        }

        if (this.debug) {
          console.log('square => element,options',element,options);
        }

        $element.css('height','');

        if (typeof options['above'] === 'number' && windowWidth < options['above']) {
          return;
        }

        if (typeof options['below'] === 'number' && windowWidth > options['below']) {
          return;
        }

        if (typeof options['multiply'] === 'number') {
          newHeight = (isNaN(options['multiply']) ? 1 : options['multiply']) * newHeight;
        }

        if (typeof options['subtract'] === 'number') {
          newHeight = newHeight - (isNaN(options['subtract']) ? 0 : options['subtract']);
        }

        if (typeof options['add'] === 'number') {
          newHeight = newHeight + (isNaN(options['add']) ? 0 : options['add']);
        }

        $element.css('height',newHeight);

        $(document).trigger('square',{type: 'square', element: element, options: options, newHeight: newHeight});

      },this));
    },
    verticalCenter: function(attribute) {
      this.runVerticalCenter = attribute;
      var windowWidth = window.innerWidth || this.$window.width();

      $('[' + attribute + ']').each($.proxy(function(index,element){
        var $element = $(element),
            $parent = $element.parent(),
            options = $element.data('options'),
            newHeight = 0;

        if (typeof options === 'undefined') {
          $element.data('options',this.parceOptions($element.attr(attribute)));
          options = $element.data('options');
          $element.attr(attribute,'');
        }

        if (this.debug) {
          console.log('verticalCenter => element,options',element,options);
        }

        $element.css(this.verticalStatic);

        if (typeof options['above'] === 'number' && windowWidth < options['above']) {
          return;
        }

        if (typeof options['below'] === 'number' && windowWidth > options['below']) {
          return;
        }

        if ($parent.css('position') === 'static') {
          $parent.css('position', 'relative');
        }

        newHeight = $element.outerHeight();

        $element.css(this.verticalAbsolute).css('height',newHeight);

        $(document).trigger('vertical-center',{type: 'vertical-center', element: element, options: options, newHeight: newHeight});

      },this));
    },
    fullWindowHeight: function(attribute) {
      this.runFullWindowHeight = attribute;
      var windowHeight = window.innerHeight || this.$window.height(),
          windowWidth = window.innerWidth || this.$window.width();

      $('[' + attribute + ']').each($.proxy(function(index,element){
        var $element = $(element),
            options = $element.data('options');

        if (typeof options === 'undefined') {
          $element.data('options',this.parceOptions($element.attr(attribute)));
          options = $element.data('options');
          $element.attr(attribute,'');
        }

        if (this.debug) {
          console.log('fullWindowHeight => element,options',element,options);
        }

        var property = typeof options['force'] !== 'undefined' ? 'height' : 'min-height';

        $element.css(property,'');

        if (typeof options['above'] === 'number' && windowWidth < options['above']) {
          return;
        }

        if (typeof options['below'] === 'number' && windowWidth > options['below']) {
          return;
        }

        if (typeof options['multiply'] === 'number') {
          windowHeight = (isNaN(options['multiply']) ? 1 : options['multiply']) * windowHeight;
        }

        $element.css(property,windowHeight);

        $(document).trigger('full-window-height',{type: 'full-window-height', element: element, options: options, windowHeight: windowHeight});

      },this));
    },
    equalize: function(attribute) {
      this.runEqualize = attribute;
      var windowWidth = window.innerWidth || this.$window.width();

      if(this.runVerticalCenter) {
        $('[' + this.runVerticalCenter + ']').css(this.verticalStatic);
      }

      $('[' + attribute + ']').each($.proxy(function(index,element){
        var $element = $(element),
            $columns = $element.find('[equalize]'),
            options = $element.data('options');

        if (typeof options === 'undefined') {
          $element.data('options',this.parceOptions($element.attr(attribute)));
          options = $element.data('options');
          $element.attr(attribute,'');
        }

        if (this.debug) {
          console.log('equalize => element,options',element,options);
        }

        $columns.css('height','');

        if (typeof options['above'] === 'number' && windowWidth < options['above']) {
          return;
        }

        if (typeof options['below'] === 'number' && windowWidth > options['below']) {
          return;
        }

        var newHeight = this.equalizeMax($columns);
        $columns.css('height',newHeight);

        $(document).trigger('equalize',{type: 'equalize', element: element, columns: $columns, options: options, equalizeMax: newHeight});

      },this));
    },
    equalizeEvents: function(){},
    equalizeMax: function($columns){
      if (typeof $columns !== 'object') return 0;
      var height = 0;
      var maxHeight = 0;

      for(var i = 0; i < $columns.length; i++){
        height = $($columns[i]).outerHeight();
        if(height > maxHeight) maxHeight = height;
      }

      return maxHeight;
    },
    parceOptions: function(options) {
      if (typeof options === 'undefined' || options === '') return {};

      options = JSON.stringify(eval('('+options+')'));
      options = JSON.parse(options);

      return options;
    }
  };

  $(window).on('alignment',function(){
    window.form5.alignment.fullWindowHeight('full-window-height');
    window.form5.alignment.equalize('equalize-wrap');
    window.form5.alignment.verticalCenter('vertical-center');
    window.form5.alignment.square('square');
  });

  $(window).on('resize',function(){
    var resizeTimeout;
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function(){
      $(window).trigger('alignment');
    },200);
  }).trigger('resize');

}).call(this);
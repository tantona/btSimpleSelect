/*!
 * btSimpleSelect v0.0.2
 * A bare bones twitter bootstrap themed select box
 * Copyright 2014 btSimpleSelect
 * Licensed under the MIT licens
 *
 * --Inspired by bootstrap-select--
 * ==> http://silviomoreto.github.io/bootstrap-select/
 *
 * Copyright 2013 bootstrap-select
 * Licensed under the MIT license
 *
 *                           __
 *    ,                    ," e`--o
 *   ((                   (  | __,'
 *    \\~----------------' \_;/
 *    (                      /
 *    /) ._______________.  )
 *   (( (               (( (
 *    ``-'               ``-'
 *  - JoZ 
 */

!function($) {

    'use strict';

    var btSimpleSelect = function(element, options, e) {
        this.$el = $(element);
        this.$el.prop('selectedIndex',-1);
        
        //Merge defaults, options and data-attributes to make our options
        this.options = $.extend({}, $.fn.btSimpleSelect.defaults, this.$el.data(), typeof options == 'object' && options);

        //If we have no title yet, check the attribute 'title' (this is missed by jq as its not a data-attribute
        if (this.options.title === null) {
            this.options.title = this.$el.attr('title');
        }

        //Expose public methods
        this.val = btSimpleSelect.prototype.val;
        this.refresh = btSimpleSelect.prototype.checkIfSelected;
        this.init();
    };

    btSimpleSelect.prototype = {

        constructor: btSimpleSelect,

        init : function(){
			var that = this;
			this.$el.hide();

			this.$el.attr('multiple',this.options.multiple);
			if( this.options.values === null || this.options.values === '' || this.options.values === [] ){
				this.$el.prop('selectedIndex',-1);
			}else{
				this.$el.val( this.options.values );	
			}
				
			this.render();
			this.clickHandler();

		},
		

		render : function(){

			var parentWidth = parseInt( this.options.width ),
			childWidth 	= (100 - parentWidth) + parentWidth;

			parentWidth = ( this.options.width !== 0 ? 'style="width:' + parentWidth + '%"' : 0 );
			childWidth = ( this.options.width !== 0 ? 'style="width:' + childWidth + '%;' : 0 );
			
			var listHeight = ( this.options.listHeight !== 'none' ? 'overflow-y:auto;height:' + this.options.listHeight + '"' : '' );

			var DOMobj = '<div class="btn-group btSelect-dropdown" ' + parentWidth + '><button ' + childWidth + '" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">' + this.options.title + this.options.caret + '</button><ul style="' + listHeight + ' class="dropdown-menu" role="menu">';
			
			
			for( var i in this.$el.context ){
				if( !isNaN(parseFloat(i)) && isFinite(i) ){
					DOMobj += '<li><a href="#">' + this.$el.context[i].value + '<span></span></a></li>';
				}
			};

			DOMobj += '</ul></div>';

			this.$el.after( DOMobj );
			
			this.checkIfSelected();
			// indicators( el );
		},

		val : function(value){
        	if (value !== undefined) {
                this.$el.val( value );

                this.$el.change();
                return this.$el;
            } else {
                return this.$el.val();
            }
        },

		setValue : function( option ){
			this.$el.find('option').each(function(){
		    	if( this.value === option ){
		    		var s = ( $(this).prop('selected') === true ? false : true );
		      		$(this).prop('selected', s );
		    	}
		  	});

		  	console.log( this.$el.val() );
		},

		setTitle : function( selectedItems ){
			var title;
			

			if( selectedItems === null || selectedItems === '' ){
				title = this.$el.attr('title');
			}else if( !$.isArray( selectedItems ) ){
				title = selectedItems;
			}else{
				if( selectedItems.length > 1 ){
					title = selectedItems.length + ' items';
				}else if( selectedItems.length === 1 && selectedItems.length > 0 ){
					title = selectedItems.join(', ');
				}
			}
			
			this.$el.next('.btn-group').find('button').html( title + this.options.caret);
			
		},
		
		checkIfSelected : function(){
			var selectedItems = this.$el.val();
			
			var that = this;
			//setTitle( el,selectedItems );
			this.$el.next('.btSelect-dropdown').find('a').each(function(){
				
				var span = $(this).find('span');
				if( $.isArray( selectedItems ) ){
					if( $.inArray($(this).text(),selectedItems) !== -1 ){
						span.addClass( that.options.checkIcon );
					}else{
						span.removeClass( that.options.checkIcon );
					}
				}else{
					if( $(this).text() === selectedItems ){
						span.addClass( that.options.checkIcon );
					}else{
						span.removeClass( that.options.checkIcon );
					}
				}
								
			})

			this.setTitle( selectedItems );
		},

		clickHandler : function(){
			var that = this;
			this.$el.next('.btSelect-dropdown').find('a').each(function(event){

				$(this).on('click',function(event){
					event.stopPropagation();
            		event.preventDefault();
					var option = this.text;
					that.setValue( option );
					that.checkIfSelected();
					
				});
			});
		}
		
    };

    $.fn.btSimpleSelect = function(option, event) {
       //get the args of the outer function..
       var args = arguments;
       var value;
       var chain = this.each(function() {
            if ($(this).is('select')) {
                var $this = $(this),
                    data = $this.data('btSimpleSelect'),
                    options = typeof option == 'object' && option;

                if (!data) {
                    $this.data('btSimpleSelect', (data = new btSimpleSelect(this, options, event)));
                } else if (options) {
                    for(var i in options) {
                       data.options[i] = options[i];
                    }
                }

                if (typeof option == 'string') {
                    //Copy the value of option, as once we shift the arguments
                    //it also shifts the value of option.
                    var property = option;
                    if (data[property] instanceof Function) {
                        [].shift.apply(args);
                        value = data[property].apply(data, args);
                    } else {
                        value = data.options[property];
                    }
                }
            }
        });

        if (value !== undefined) {
            return value;
        } else {
            return chain;
        }
    };

    $.fn.btSimpleSelect.defaults = {
			multiple 	: true,  // multiple selectbox
			values 		: '', // default values
			width 		: 0, // Percent of parent element
			listHeight	: 100,
			checkIcon	: 'glyphicon glyphicon-ok',
			caret		: '<span class="caret pull-right" style="margin-top: 7px;"></span>'
	};


}(window.jQuery);

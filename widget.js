WAF.define('MorrisBarChart', ['waf-core/widget'], function(widget) {
	
    var MorrisBarChart = widget.create('MorrisBarChart', {
    	items: widget.property({
			type: 'datasource',
			attributes: [{
				name: 'xKey'
			}]
		}),

		ykey: widget.property({bindable: false,type: 'list', attributes: [ // Bug
			{name: 'column', title: 'Colmun'},
			{name: 'label', title: 'Label'},
			{name: 'color', title: 'Colmun', type: 'string'}
		]}),

		stacked: widget.property({
			defaultValue: true,
			bindable: false,
			type: 'boolean'
		}),

		hideHover: widget.property({
			defaultValue: true,
			bindable: false,
			type: 'enum',
			values: {
				'false': 'Always show a hover legend',
				'auto': 'Show legend on hover',
				'true': 'Never show a hover legend'
			}
		}),

		gridTextColor: widget.property({
			defaultValue: '#888',
			bindable: false,
			type: 'string',
			description: 'Placeholder color'
		}),

		axes: widget.property({
			defaultValue: true,
			bindable: false,
			type: 'boolean'
		}),

		grid: widget.property({
			defaultValue: true,
			bindable: false,
			type: 'boolean'
		}),

        init: function() {
        	var $node = $(this.node);
        	var data = [];
        	var that = this;
        	var columns = [];
        	var labels = [];
        	var barColors = [];
        	var chart = null;
        	var dataSource = this.items();

        	this.ykey().forEach(function (ykey) {
        		columns.push(ykey.column);
        		labels.push(ykey.label);
        		barColors.push(ykey.color);
        	});

        	this.items.onCollectionChange(function() {
                dataSource.getElements(0, dataSource.length, function (result) {
                	var elements = result.elements;

                	if(elements.length == 0){
                		return;
                	}

            		if(chart){
            			chart.setData(elements);
            		}else{
            			chart = Morris.Bar({
							element: that.node.id,
							data: result.elements,
							xkey: that.items.attributeFor('xKey'),
							ykeys: columns,
							labels: labels,
							barColors: barColors,
							stacked: that.stacked(),
							hideHover: that.hideHover(),
							axes: that.axes(),
							grid: that.grid(),
							gridTextColor: that.gridTextColor()
						});
            		}
            	});
            });
        }
    });

    return MorrisBarChart;

});
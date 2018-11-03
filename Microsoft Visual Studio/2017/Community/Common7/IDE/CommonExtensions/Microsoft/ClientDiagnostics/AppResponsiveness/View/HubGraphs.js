// 
// Copyright (C) Microsoft. All rights reserved.
//
var VisualProfiler;
(function (VisualProfiler) {
    var Graphs;
    (function (Graphs) {
        "use strict";
        /* A helper class to get graph data from the analyzer.
         */
        var DataUtilities = (function () {
            function DataUtilities() {
            }
            DataUtilities.getFilteredResult = function (dataWarehouse, analyzerId, counterId, timespan, customData) {
                var contextData = {
                    timeDomain: timespan,
                    customDomain: {
                        CounterId: counterId
                    }
                };
                if (customData) {
                    for (var key in customData) {
                        if (customData.hasOwnProperty(key)) {
                            contextData.customDomain[key] = customData[key];
                        }
                    }
                }
                return dataWarehouse.getFilteredData(contextData, analyzerId);
            };
            return DataUtilities;
        }());
        Graphs.DataUtilities = DataUtilities;
    })(Graphs = VisualProfiler.Graphs || (VisualProfiler.Graphs = {}));
})(VisualProfiler || (VisualProfiler = {}));
// 
// Copyright (C) Microsoft. All rights reserved.
//
var VisualProfiler;
(function (VisualProfiler) {
    var Graphs;
    (function (Graphs) {
        "use strict";
        /* A helper class to get the resource string either from the hub resource dictionary or from Microsoft.Plugin.
         */
        var GraphResources = (function () {
            function GraphResources(resources) {
                this._graphResources = resources;
            }
            GraphResources.prototype.getString = function (resourceId) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                // First try to get the resource from the dictionary
                if (this._graphResources) {
                    var resourceString = this._graphResources[resourceId];
                    if (resourceString !== undefined) {
                        resourceString = GraphResources.format(resourceId, resourceString, args);
                        return resourceString;
                    }
                }
                // Fallback to the Microsoft.Plugin resources
                try {
                    return Microsoft.Plugin.Resources.getString.apply(Microsoft.Plugin.Resources, arguments);
                }
                catch (e) { }
                return resourceId;
            };
            GraphResources.format = function (resourceId, format, args) {
                return format.replace(GraphResources.FORMAT_REG_EXP, function (match, index) {
                    var replacer;
                    switch (match) {
                        case "{{":
                            replacer = "{";
                            break;
                        case "}}":
                            replacer = "}";
                            break;
                        case "{":
                        case "}":
                            throw new Error(Microsoft.Plugin.Resources.getErrorString("JSPlugin.3002"));
                        default:
                            var argsIndex = parseInt(index);
                            if (args && argsIndex < args.length) {
                                replacer = args[argsIndex];
                            }
                            else {
                                throw new Error(Microsoft.Plugin.Resources.getErrorString("JSPlugin.3003") + " (resourceId = " + resourceId + ")");
                            }
                            break;
                    }
                    if (replacer === undefined || replacer === null) {
                        replacer = "";
                    }
                    if (typeof replacer !== "string") {
                        replacer = replacer.toString();
                    }
                    return replacer;
                });
            };
            GraphResources.FORMAT_REG_EXP = /\{{2}|\{(\d+)\}|\}{2}|\{|\}/g;
            return GraphResources;
        }());
        Graphs.GraphResources = GraphResources;
    })(Graphs = VisualProfiler.Graphs || (VisualProfiler.Graphs = {}));
})(VisualProfiler || (VisualProfiler = {}));
// 
// Copyright (C) Microsoft. All rights reserved.
//
var VisualProfiler;
(function (VisualProfiler) {
    var Graphs;
    (function (Graphs) {
        "use strict";
        var DiagnosticsHub = Microsoft.VisualStudio.DiagnosticsHub;
        var DataSeriesInfo = (function () {
            function DataSeriesInfo(name, cssClass, sortOrder) {
                if (!name || sortOrder === undefined || sortOrder === null) {
                    throw new Error(Microsoft.Plugin.Resources.getErrorString("JSPerf.1044"));
                }
                this._name = name;
                this._cssClass = cssClass;
                this._sortOrder = sortOrder;
            }
            Object.defineProperty(DataSeriesInfo.prototype, "cssClass", {
                get: function () {
                    return this._cssClass;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataSeriesInfo.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataSeriesInfo.prototype, "sortOrder", {
                get: function () {
                    return this._sortOrder;
                },
                enumerable: true,
                configurable: true
            });
            return DataSeriesInfo;
        }());
        Graphs.DataSeriesInfo = DataSeriesInfo;
        var StackedBarChartPresenter = (function () {
            function StackedBarChartPresenter(options) {
                this._data = [];
                this._dataSeriesInfo = {};
                this._maximumYValue = Number.NEGATIVE_INFINITY;
                this.viewModel = [];
                this._options = options;
                this.validateOptions();
                this._pixelHorizontalValue = this.xWidth / this._options.width;
            }
            Object.defineProperty(StackedBarChartPresenter.prototype, "maximumYValue", {
                get: function () {
                    return this._maximumYValue;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StackedBarChartPresenter.prototype, "xWidth", {
                get: function () {
                    return this._options.maxX - this._options.minX;
                },
                enumerable: true,
                configurable: true
            });
            StackedBarChartPresenter.prototype.addData = function (chartData) {
                var _this = this;
                chartData.forEach(function (dataItem) {
                    if (_this._dataSeriesInfo.hasOwnProperty(dataItem.series)) {
                        _this._data.push(dataItem);
                    }
                    else {
                        throw new Error(Microsoft.Plugin.Resources.getErrorString("JSPerf.1043"));
                    }
                });
                this.generateViewModel();
            };
            StackedBarChartPresenter.prototype.addSeries = function (seriesInfo) {
                for (var i = 0; i < seriesInfo.length; i++) {
                    var info = seriesInfo[i];
                    if (this._dataSeriesInfo.hasOwnProperty(info.name)) {
                        throw new Error(Microsoft.Plugin.Resources.getErrorString("JSPerf.1045"));
                    }
                    this._dataSeriesInfo[info.name] = info;
                }
            };
            StackedBarChartPresenter.prototype.getViewOptions = function () {
                var viewOptions = {
                    ariaDescription: this._options.ariaDescription,
                    ariaLabelCallback: this._options.ariaLabelCallback,
                    height: this._options.height,
                    width: this._options.width,
                    tooltipCallback: this._options.tooltipCallback,
                    legendData: this._dataSeriesInfo
                };
                return viewOptions;
            };
            StackedBarChartPresenter.prototype.convertChartAreaPercentToDataValue = function (percent) {
                return Math.round(percent * this.xWidth / 100) + this._options.minX;
            };
            StackedBarChartPresenter.prototype.determineYAxisScale = function (allBars) {
                for (var i = 0; i < allBars.length; i++) {
                    var totalStackHeight = 0;
                    var currentBar = allBars[i];
                    for (var j = 0; j < currentBar.length; j++) {
                        var stackComponent = currentBar[j];
                        if (stackComponent.height > 0) {
                            totalStackHeight += stackComponent.height;
                        }
                    }
                    this._maximumYValue = Math.max(this._maximumYValue, totalStackHeight);
                }
                this._maximumYValue = Math.max(this._options.minYHeight, this._maximumYValue);
                // Round the max value to the next 100, taking into account real precision (to avoid scaling up by 100 to cater
                // for the 100.0000000001 case)
                this._maximumYValue = Math.ceil(Math.floor(this._maximumYValue) / 100) * 100;
                var availableAxisHight = this._options.height - StackedBarChartPresenter.YAXIS_PIXEL_PADDING;
                if (availableAxisHight <= 0) {
                    availableAxisHight = this._options.height;
                }
                this._pixelVerticalValue = this._maximumYValue / availableAxisHight;
                this._maximumYValue = this._options.height * this._pixelVerticalValue;
            };
            StackedBarChartPresenter.prototype.generateViewModel = function () {
                var allBars = [[]];
                var singleBar = [];
                var barWidthAndMargin = this._options.barWidth + this._options.barGap;
                var currentXValue = this._options.minX;
                var prevValue = Number.NEGATIVE_INFINITY;
                var x = 0;
                var i = 0;
                while (i < this._data.length) {
                    var dataItem = this._data[i];
                    if (dataItem.x < prevValue) {
                        throw new Error(Microsoft.Plugin.Resources.getErrorString("JSPerf.1046"));
                    }
                    if (dataItem.x > this._options.maxX) {
                        break;
                    }
                    prevValue = dataItem.x;
                    var currentXValue = Math.floor(x * this._pixelHorizontalValue + this._options.minX);
                    var currentBarMinValue = currentXValue;
                    var currentBarMaxValue = currentXValue + Math.floor((this._options.barWidth + this._options.barGap) * this._pixelHorizontalValue);
                    if (dataItem.x < currentBarMinValue) {
                        i++;
                        continue;
                    }
                    if (dataItem.x < currentBarMaxValue) {
                        dataItem.x = x;
                        singleBar.push(dataItem);
                        i++;
                    }
                    else {
                        allBars.push(singleBar);
                        singleBar = [];
                        x += barWidthAndMargin;
                    }
                }
                allBars.push(singleBar);
                this.determineYAxisScale(allBars);
                for (var i = 0; i < allBars.length; i++) {
                    this.generateViewModelForSingleStack(allBars[i]);
                }
            };
            StackedBarChartPresenter.prototype.generateViewModelForSingleStack = function (dataItems) {
                if (!dataItems || dataItems.length === 0) {
                    return;
                }
                dataItems.sort(this.sortBySeries.bind(this));
                var accumulatedHeight = 0;
                var maxHeightExceeded = false;
                var singleBarViewModel = [];
                for (var i = dataItems.length - 1; i >= 0; i--) {
                    var dataItem = dataItems[i];
                    if (dataItem.height <= 0) {
                        continue;
                    }
                    // We want to display the small amounts as 1-pixel bars, but need to round the rest
                    // to reduce the liklihood of exceeding 100% for the stack on the graph.
                    var barHeight = Math.round(dataItem.height / this._pixelVerticalValue);
                    if (dataItem.height > 0 && barHeight < 1) {
                        barHeight = 1;
                    }
                    var startY = this._options.height - (barHeight + accumulatedHeight) - 1;
                    if (startY < 0) {
                        barHeight = this._options.height - accumulatedHeight;
                        startY = 0;
                        maxHeightExceeded = true;
                    }
                    accumulatedHeight += barHeight;
                    if (this._options.showStackGap && barHeight > 1) {
                        barHeight -= 1;
                        startY += 1;
                    }
                    var rectangle = {
                        x: dataItem.x,
                        y: startY,
                        height: barHeight,
                        width: this._options.barWidth,
                        className: this._dataSeriesInfo[dataItem.series].cssClass,
                        chartItem: dataItem
                    };
                    this.viewModel.push(rectangle);
                    if (maxHeightExceeded) {
                        break;
                    }
                }
            };
            StackedBarChartPresenter.prototype.sortBySeries = function (chartItem1, chartItem2) {
                return this._dataSeriesInfo[chartItem2.series].sortOrder - this._dataSeriesInfo[chartItem1.series].sortOrder;
            };
            StackedBarChartPresenter.prototype.validateOptions = function () {
                if (!this._options) {
                    throw new Error(Microsoft.Plugin.Resources.getErrorString("JSPerf.1047"));
                }
                if ((this._options.minX === undefined || this._options.minX === null) ||
                    (this._options.maxX === undefined || this._options.maxX === null) ||
                    (this._options.minY === undefined || this._options.minY === null) ||
                    (this._options.minX > this._options.maxX) ||
                    (!this._options.height || !this._options.width || this._options.height < 0 || this._options.width < 0) ||
                    (!this._options.barWidth || this._options.barWidth < 0)) {
                    throw new Error(Microsoft.Plugin.Resources.getErrorString("JSPerf.1048"));
                }
                this._options.barGap = this._options.barGap || 0;
                this._options.showStackGap = this._options.showStackGap || false;
                this._options.minYHeight = this._options.minYHeight || this._options.minY;
            };
            StackedBarChartPresenter.YAXIS_PIXEL_PADDING = 10;
            return StackedBarChartPresenter;
        }());
        Graphs.StackedBarChartPresenter = StackedBarChartPresenter;
        var StackedBarChartView = (function () {
            function StackedBarChartView() {
                this._idCount = 0;
                this._selectedId = -1;
                this.rootElement = document.createElement("div");
                this.rootElement.style.width = this.rootElement.style.height = "100%";
            }
            Object.defineProperty(StackedBarChartView.prototype, "presenter", {
                set: function (value) {
                    this._presenter = value;
                    this._viewData = this._presenter.viewModel;
                    this._options = value.getViewOptions();
                    this._barGraphWidth = this._options.width;
                    this.drawChart();
                },
                enumerable: true,
                configurable: true
            });
            StackedBarChartView.prototype.convertPageXToChartAreaPercent = function (pageX) {
                var rect = this._chartAreaContainer.getBoundingClientRect();
                return (pageX - rect.left) / this._barGraphWidth * 100;
            };
            StackedBarChartView.prototype.createContainer = function () {
                if (!this._chartAreaContainer) {
                    this._chartAreaContainer = document.createElement("div");
                    this.rootElement.appendChild(this._chartAreaContainer);
                }
                else {
                    this._chartAreaContainer.innerHTML = "";
                }
                this._chartAreaContainer.style.width = this._options.width + "px";
                this._chartAreaContainer.style.height = this._options.height + "px";
                this._chartAreaContainer.classList.add("stackedBarChart");
                this._chartAreaContainer.style.display = "-ms-grid";
            };
            StackedBarChartView.prototype.createRect = function (x, y, height, width, className) {
                var rect = document.createElement("div");
                rect.id = StackedBarChartView._barIdPrefix + this._idCount;
                rect.tabIndex = -1;
                this._idCount++;
                rect.classList.add("bar");
                rect.classList.add(className);
                rect.style.left = x + "px";
                rect.style.bottom = (this._options.height - y - height) + "px";
                rect.style.height = height + "px";
                rect.style.width = width + "px";
                return rect;
            };
            StackedBarChartView.prototype.drawChart = function () {
                if (!this._viewData) {
                    throw new Error(Microsoft.Plugin.Resources.getErrorString("JSPerf.1049"));
                }
                this.createContainer();
                this.initializeBarGraph();
                this.renderViewData(this._barGraph, this._viewData);
                this._chartAreaContainer.appendChild(this._barGraph);
            };
            StackedBarChartView.prototype.initializeBarGraph = function () {
                var _this = this;
                this._selectedId = -1;
                this._idCount = 0;
                this._barGraph = document.createElement("div");
                this._barGraph.classList.add("barGraph");
                this._barGraph.tabIndex = 0;
                this._barGraph.style.height = this._options.height + "px";
                this._barGraph.style.width = this._barGraphWidth + "px";
                this._barGraph.addEventListener("keydown", this.onBarGraphKeydown.bind(this));
                this._barGraph.addEventListener("focus", function () { _this._selectedId = -1; });
                if (this._options.ariaDescription) {
                    this._barGraph.setAttribute("aria-label", this._options.ariaDescription);
                }
            };
            StackedBarChartView.prototype.onBarBlur = function (event) {
                var bar = event.currentTarget;
                bar.classList.remove("focused");
                Microsoft.Plugin.Tooltip.dismiss();
            };
            StackedBarChartView.prototype.onBarFocus = function (chartItem, event) {
                var bar = event.currentTarget;
                bar.classList.add("focused");
                if (this._options.ariaLabelCallback) {
                    var ariaLabel = this._options.ariaLabelCallback(chartItem);
                    bar.setAttribute("aria-label", ariaLabel);
                }
            };
            StackedBarChartView.prototype.onBarGraphKeydown = function (event) {
                if (event.keyCode === DiagnosticsHub.Common.KeyCodes.ArrowLeft || event.keyCode === DiagnosticsHub.Common.KeyCodes.ArrowRight) {
                    if (event.keyCode === DiagnosticsHub.Common.KeyCodes.ArrowLeft) {
                        if ((this._selectedId === 0) || (this._selectedId === -1)) {
                            this._selectedId = this._idCount;
                        }
                        this._selectedId--;
                    }
                    else if (event.keyCode === DiagnosticsHub.Common.KeyCodes.ArrowRight) {
                        this._selectedId++;
                        if (this._selectedId === this._idCount) {
                            this._selectedId = 0;
                        }
                    }
                    var bar = document.getElementById(StackedBarChartView._barIdPrefix + this._selectedId);
                    bar.focus();
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
                return true;
            };
            StackedBarChartView.prototype.onBarKeydown = function (objectForTooltip, event) {
                if (event.keyCode === DiagnosticsHub.Common.KeyCodes.Enter) {
                    var element = event.currentTarget;
                    var offsetX = window.screenLeft + element.offsetLeft + element.clientWidth;
                    var offsetY = window.screenTop + element.offsetTop;
                    element = element.offsetParent;
                    while (element) {
                        offsetX += element.offsetLeft;
                        offsetY += element.offsetTop;
                        element = element.offsetParent;
                    }
                    this.showTooltip(objectForTooltip, offsetX, offsetY);
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
                return true;
            };
            StackedBarChartView.prototype.renderViewData = function (container, viewData) {
                for (var i = 0; i < viewData.length; i++) {
                    var barInfo = viewData[i];
                    var rectangle = this.createRect(barInfo.x, barInfo.y, barInfo.height, barInfo.width, barInfo.className);
                    rectangle.addEventListener("mouseover", this.showTooltip.bind(this, barInfo.chartItem));
                    rectangle.addEventListener("mouseout", function () { return Microsoft.Plugin.Tooltip.dismiss(); });
                    rectangle.addEventListener("keydown", this.onBarKeydown.bind(this, barInfo.chartItem));
                    rectangle.addEventListener("focus", this.onBarFocus.bind(this, barInfo.chartItem));
                    rectangle.addEventListener("blur", this.onBarBlur.bind(this));
                    container.appendChild(rectangle);
                }
            };
            StackedBarChartView.prototype.showTooltip = function (chartItem, x, y) {
                if (this._options.tooltipCallback) {
                    var toolTipContent = this._options.tooltipCallback(chartItem);
                    var config = { content: toolTipContent, delay: 0, x: x, y: y, contentContainsHTML: true };
                    Microsoft.Plugin.Tooltip.show(config);
                }
            };
            StackedBarChartView._barIdPrefix = "bar";
            return StackedBarChartView;
        }());
        Graphs.StackedBarChartView = StackedBarChartView;
    })(Graphs = VisualProfiler.Graphs || (VisualProfiler.Graphs = {}));
})(VisualProfiler || (VisualProfiler = {}));
// 
// Copyright (C) Microsoft. All rights reserved.
//
/// <reference path="StackedBarChart.ts" />
/// <reference path="DataTypes.d.ts" />
/// <reference path="DataUtilities.ts" />
/// <reference path="GraphResources.ts" />
var VisualProfiler;
(function (VisualProfiler) {
    var Graphs;
    (function (Graphs) {
        "use strict";
        var DiagnosticsHub = Microsoft.VisualStudio.DiagnosticsHub;
        var Category = (function () {
            function Category() {
            }
            Category.parsingCategory = "Parsing_Category";
            Category.layoutCategory = "Layout_Category";
            Category.appCodeCategory = "AppCode_Category";
            Category.xamlOtherCategory = "XamlOther_Category";
            Category.renderCategory = "Render_Category";
            Category.ioCategory = "IO_Category";
            return Category;
        }());
        Graphs.Category = Category;
        var StackedBarGraph = (function () {
            function StackedBarGraph(config) {
                this._scaleChangedEvent = new DiagnosticsHub.AggregatedEvent();
                this._config = config;
                this._graphResources = new Graphs.GraphResources(this._config.resources);
                this._timeRange = this._config.timeRange || new DiagnosticsHub.JsonTimespan(new DiagnosticsHub.BigNumber(0, 0), new DiagnosticsHub.BigNumber(0, 0));
                this._container = document.createElement("div");
                StackedBarGraph.validateConfiguration(this._config);
                this._dataSource = this._config.jsonConfig.Series[0].DataSource;
                if (config.pathToScriptFolder && config.loadCss) {
                    config.loadCss(config.pathToScriptFolder + "/CSS/hubGraphs/StackedBarChart.css");
                    config.loadCss(config.pathToScriptFolder + "/DataCategoryStyles.css");
                }
                // Setup scale
                this._config.scale = this._config.scale || {};
                this._config.scale.minimum = 0;
                this._config.scale.maximum = 120;
                this._config.scale.axes = [];
                this._config.scale.axes.push({
                    value: 100
                });
                // add series and legend to config
                this._config.legend = this._config.legend || [];
                var seriesCollection = this._config.jsonConfig.Series;
                for (var i = 0; i < seriesCollection.length; i++) {
                    var series = seriesCollection[i];
                    this._config.legend.push({
                        color: series.Color,
                        legendText: this._graphResources.getString(series.Legend),
                        legendTooltip: (series.LegendTooltip ? this._graphResources.getString(series.LegendTooltip) : null)
                    });
                }
            }
            Object.defineProperty(StackedBarGraph.prototype, "container", {
                get: function () {
                    return this._container;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StackedBarGraph.prototype, "scaleChangedEvent", {
                get: function () {
                    return this._scaleChangedEvent;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StackedBarGraph.prototype, "containerOffsetWidth", {
                get: function () {
                    if (this._containerOffsetWidth === undefined) {
                        this._containerOffsetWidth = this._container.offsetWidth;
                    }
                    return this._containerOffsetWidth;
                },
                enumerable: true,
                configurable: true
            });
            StackedBarGraph.prototype.onDataUpdate = function (timestampNs) {
                // Not implemented
            };
            StackedBarGraph.prototype.addSeriesData = function (counterId, points, fullRender, dropOldData) {
                // Not implemented
            };
            StackedBarGraph.prototype.getDataPresenter = function () {
                var presenterOptions = {
                    ariaDescription: this._graphResources.getString("UiThreadActivityAriaLabel"),
                    height: this._config.height,
                    width: this.containerOffsetWidth,
                    minX: parseInt(this._timeRange.begin.value),
                    maxX: parseInt(this._timeRange.end.value),
                    minY: 0,
                    minYHeight: 100,
                    barWidth: this._config.jsonConfig.BarWidth,
                    barGap: this._config.jsonConfig.BarGap,
                    showStackGap: this._config.jsonConfig.ShowStackGap,
                    tooltipCallback: this.createTooltip.bind(this),
                    ariaLabelCallback: this.createAriaLabel.bind(this)
                };
                var presenter = new Graphs.StackedBarChartPresenter(presenterOptions);
                //
                // Add series information to the presenter
                //
                var dataSeriesInfo = [];
                var stackedDataSeries = this._config.jsonConfig.Series;
                for (var i = 0; i < stackedDataSeries.length; i++) {
                    var seriesItem = stackedDataSeries[i];
                    dataSeriesInfo.push({
                        cssClass: seriesItem.CssClass,
                        name: seriesItem.Category,
                        sortOrder: i + 1
                    });
                }
                presenter.addSeries(dataSeriesInfo);
                return presenter;
            };
            StackedBarGraph.prototype.getGranularity = function () {
                var bucketWidth = this._config.jsonConfig.BarGap + this._config.jsonConfig.BarWidth;
                var graphDuration = parseInt(this._timeRange.elapsed.value);
                if (graphDuration <= 0 || this.containerOffsetWidth <= 0) {
                    return 0;
                }
                return Math.floor(bucketWidth / this.containerOffsetWidth * graphDuration);
            };
            StackedBarGraph.prototype.removeInvalidPoints = function (base) {
                // Not implemented
            };
            StackedBarGraph.prototype.render = function (fullRender) {
                if (this._config.jsonConfig.GraphBehaviour == DiagnosticsHub.GraphBehaviourType.PostMortem) {
                    this.setData(this._timeRange);
                }
            };
            StackedBarGraph.prototype.resize = function (evt) {
                this._containerOffsetWidth = undefined;
                this.render();
            };
            StackedBarGraph.prototype.onViewportChanged = function (viewportArgs) {
                if (this._timeRange.equals(viewportArgs.currentTimespan)) {
                    // Only selection changed, ignore this event
                    return;
                }
                this._timeRange = viewportArgs.currentTimespan;
                this.render();
            };
            StackedBarGraph.validateConfiguration = function (config) {
                if (!config) {
                    throw new Error(Microsoft.Plugin.Resources.getErrorString("JSPerf.1070"));
                }
                var jsonObject = config.jsonConfig;
                if (!jsonObject) {
                    throw new Error(Microsoft.Plugin.Resources.getErrorString("JSPerf.1071"));
                }
                if (!jsonObject.Series || jsonObject.Series.length === 0) {
                    throw new Error(Microsoft.Plugin.Resources.getErrorString("JSPerf.1072"));
                }
                jsonObject.BarWidth = jsonObject.BarWidth || 4;
                jsonObject.BarGap = jsonObject.BarGap || 0;
                jsonObject.ShowStackGap = jsonObject.ShowStackGap || false;
                if ((!config.height || config.height < 0) ||
                    jsonObject.BarWidth < 0) {
                    throw new Error(Microsoft.Plugin.Resources.getErrorString("JSPerf.1048"));
                }
            };
            StackedBarGraph.prototype.createTooltip = function (cpuUsage) {
                var tooltip = this._graphResources.getString(cpuUsage.series) + ": " + (Math.round(cpuUsage.height * 100) / 100).toLocaleString(undefined, { minimumFractionDigits: 2 }) + "%";
                return tooltip;
            };
            StackedBarGraph.prototype.createAriaLabel = function (cpuUsage) {
                var percentageUtilization = (Math.round(cpuUsage.height * 100) / 100).toLocaleString(undefined, { minimumFractionDigits: 2 });
                var formattedTime = DiagnosticsHub.RulerUtilities.formatTime(DiagnosticsHub.BigNumber.convertFromNumber(cpuUsage.x), DiagnosticsHub.UnitFormat.fullName);
                return this._graphResources.getString("UiThreadActivityBarAriaLabel", this._graphResources.getString(cpuUsage.series), percentageUtilization, formattedTime);
            };
            StackedBarGraph.jsonTimeToNanoseconds = function (bigNumber) {
                var l = bigNumber.l;
                var h = bigNumber.h;
                if (l < 0) {
                    l = l >>> 0;
                }
                if (h < 0) {
                    h = h >>> 0;
                }
                var nsec = h * 0x100000000 + l;
                return nsec;
            };
            StackedBarGraph.prototype.setData = function (timeRange) {
                var _this = this;
                if (this._settingDataPromise) {
                    this._settingDataPromise.cancel();
                    this._settingDataPromise = null;
                }
                if (!this._dataSource || !this._dataSource.CounterId || !this._dataSource.AnalyzerId) {
                    // No data to set if there is no data source
                    return;
                }
                this._settingDataPromise = this.getDataWarehouse().then(function (dataWarehouse) {
                    var granuality = _this.getGranularity();
                    if (granuality > 0) {
                        return Graphs.DataUtilities.getFilteredResult(dataWarehouse, _this._dataSource.AnalyzerId, _this._dataSource.CounterId, timeRange, {
                            granularity: granuality.toString(),
                            task: "1" // AnalysisTaskType::GetUIThreadActivityData in XamlProfiler\DataModel\XamlAnalyzer.h
                        });
                    }
                    else {
                        return Microsoft.Plugin.Promise.wrap([]);
                    }
                }).then(function (cpuUsageResult) {
                    if (_this._chart) {
                        _this._container.removeChild(_this._chart.rootElement);
                        _this._chart = null;
                    }
                    if (cpuUsageResult) {
                        var chartItems = [];
                        for (var i = 0; i < cpuUsageResult.length; i++) {
                            var cpuUsagePoint = cpuUsageResult[i];
                            var parsingTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.ParsingTime);
                            var layoutTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.LayoutTime);
                            var appCodeTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.AppCodeTime);
                            var xamlOtherTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.XamlOther);
                            var unknownTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.Unknown);
                            var renderTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.RenderTime);
                            var ioTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.IOTime);
                            var startTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.StartTime);
                            var endTime = StackedBarGraph.jsonTimeToNanoseconds(cpuUsagePoint.EndTime);
                            var totalTime = endTime - startTime;
                            if (parsingTime > 0) {
                                chartItems.push({
                                    series: Category.parsingCategory,
                                    x: startTime,
                                    height: parsingTime * 100.0 / totalTime
                                });
                            }
                            if (layoutTime > 0) {
                                chartItems.push({
                                    series: Category.layoutCategory,
                                    x: startTime,
                                    height: layoutTime * 100.0 / totalTime
                                });
                            }
                            if (appCodeTime > 0) {
                                chartItems.push({
                                    series: Category.appCodeCategory,
                                    x: startTime,
                                    height: appCodeTime * 100.0 / totalTime
                                });
                            }
                            if (xamlOtherTime > 0) {
                                chartItems.push({
                                    series: Category.xamlOtherCategory,
                                    x: startTime,
                                    height: xamlOtherTime * 100.0 / totalTime
                                });
                            }
                            if (renderTime > 0) {
                                chartItems.push({
                                    series: Category.renderCategory,
                                    x: startTime,
                                    height: renderTime * 100.0 / totalTime
                                });
                            }
                            if (ioTime > 0) {
                                chartItems.push({
                                    series: Category.ioCategory,
                                    x: startTime,
                                    height: ioTime * 100.0 / totalTime
                                });
                            }
                        }
                        var dataPresenter = _this.getDataPresenter();
                        dataPresenter.addData(chartItems);
                        _this._chart = new Graphs.StackedBarChartView();
                        _this._chart.presenter = dataPresenter;
                        // Update the y-axis scale maximum
                        _this._scaleChangedEvent.invokeEvent({
                            minimum: 0,
                            maximum: dataPresenter.maximumYValue
                        });
                        _this._container.appendChild(_this._chart.rootElement);
                    }
                }).then(function () {
                    _this._settingDataPromise = null;
                });
            };
            StackedBarGraph.prototype.getDataWarehouse = function () {
                var _this = this;
                if (this._dataWarehouse) {
                    return Microsoft.Plugin.Promise.as(this._dataWarehouse);
                }
                else {
                    return DiagnosticsHub.DataWarehouse.loadDataWarehouse().then(function (dataWarehouse) {
                        _this._dataWarehouse = dataWarehouse;
                        return _this._dataWarehouse;
                    });
                }
            };
            return StackedBarGraph;
        }());
        Graphs.StackedBarGraph = StackedBarGraph;
    })(Graphs = VisualProfiler.Graphs || (VisualProfiler.Graphs = {}));
})(VisualProfiler || (VisualProfiler = {}));
//# sourceMappingURL=HubGraphs.js.map
// SIG // Begin signature block
// SIG // MIIj6wYJKoZIhvcNAQcCoIIj3DCCI9gCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // +jQXEhF1HTLo+zqMMxENphocsSId2BahP/l0GUn0Af6g
// SIG // gg2DMIIGATCCA+mgAwIBAgITMwAAAMTpifh6gVDp/wAA
// SIG // AAAAxDANBgkqhkiG9w0BAQsFADB+MQswCQYDVQQGEwJV
// SIG // UzETMBEGA1UECBMKV2FzaGluZ3RvbjEQMA4GA1UEBxMH
// SIG // UmVkbW9uZDEeMBwGA1UEChMVTWljcm9zb2Z0IENvcnBv
// SIG // cmF0aW9uMSgwJgYDVQQDEx9NaWNyb3NvZnQgQ29kZSBT
// SIG // aWduaW5nIFBDQSAyMDExMB4XDTE3MDgxMTIwMjAyNFoX
// SIG // DTE4MDgxMTIwMjAyNFowdDELMAkGA1UEBhMCVVMxEzAR
// SIG // BgNVBAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1v
// SIG // bmQxHjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlv
// SIG // bjEeMBwGA1UEAxMVTWljcm9zb2Z0IENvcnBvcmF0aW9u
// SIG // MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA
// SIG // iIq4JMMHj5qAeRX8JmD8cogs+vSjl4iWRrejy1+JLzoz
// SIG // Lh6RePp8qR+CAbV6yxq8A8pG68WZ9/sEHfKFCv8ibqHy
// SIG // Zz3FJxjlKB/1BJRBY+zjuhWM7ROaNd44cFRvO+ytRQkw
// SIG // ScG+jzCZDMt2yfdzlRZ30Yu7lMcIhSDtHqg18XHC4HQA
// SIG // S4rS3JHr1nj+jfqtYIg9vbkfrmKXv8WEsZCu1q8r01T7
// SIG // NdrNcZLmHv/scWvLfwh2dOAQUUjU8QDISEyjBzXlWQ39
// SIG // fJzI5lrjhfXWmg8fjqbkhBfB1sqfHQHH/UinE5IzlyFI
// SIG // MvjCJKIAsr5TyoNuKVuB7zhugPO77BML6wIDAQABo4IB
// SIG // gDCCAXwwHwYDVR0lBBgwFgYKKwYBBAGCN0wIAQYIKwYB
// SIG // BQUHAwMwHQYDVR0OBBYEFMvWYoTPYDnq/2fCXNLIu6u3
// SIG // wxOYMFIGA1UdEQRLMEmkRzBFMQ0wCwYDVQQLEwRNT1BS
// SIG // MTQwMgYDVQQFEysyMzAwMTIrYzgwNGI1ZWEtNDliNC00
// SIG // MjM4LTgzNjItZDg1MWZhMjI1NGZjMB8GA1UdIwQYMBaA
// SIG // FEhuZOVQBdOCqhc3NyK1bajKdQKVMFQGA1UdHwRNMEsw
// SIG // SaBHoEWGQ2h0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9w
// SIG // a2lvcHMvY3JsL01pY0NvZFNpZ1BDQTIwMTFfMjAxMS0w
// SIG // Ny0wOC5jcmwwYQYIKwYBBQUHAQEEVTBTMFEGCCsGAQUF
// SIG // BzAChkVodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtp
// SIG // b3BzL2NlcnRzL01pY0NvZFNpZ1BDQTIwMTFfMjAxMS0w
// SIG // Ny0wOC5jcnQwDAYDVR0TAQH/BAIwADANBgkqhkiG9w0B
// SIG // AQsFAAOCAgEABhYf21fCUMgjT6JReNft+P3NvdXA8fkb
// SIG // Vu1TyGlHBdXEy+zi/JlblV8ROCjABUUT4Jp5iLxmq9u7
// SIG // 6wJVI7c9I3hBba748QBalJmKHMwJldCaHEQwqaUWx7pH
// SIG // W/UrNIufj1g3w04cryLKEM3YghCpNfCuIsiPJKaBi98n
// SIG // HORmHYk+Lv9XA03BboOgMuu0sy9QVl0GsRWMyB1jt3MM
// SIG // 49Z6Jg8qlkWnMoM+lj5XSXcjif6xEMeK5QgVUcUrWjFb
// SIG // OWqWqKSIa5Yob/HEruq9RRfMYk6BtVQaR46YpW3AbifG
// SIG // +CcfyO0gqQux8c4LmpTiap1pg6E2120g/oXV/8O4lzYJ
// SIG // /j0UwZgUqcCGzO+CwatVJEMYtUiFeIbQ+dKdPxnZFInn
// SIG // jZ9oJIhoO6nHgE4m5wghTGP9nJMVTTO1VmBP10q5OI7/
// SIG // Lt2xX6RDa8l4z7G7a4+DbIdyquql+5/dGtY5/GTJbT4I
// SIG // 5XyDsa28o7p7z5ZWpHpYyxJHYtIh7/w8xDEL9y8+ZKU3
// SIG // b2BQP7dEkE+gC4u+flj2x2eHYduemMTIjMtvR+HALpTt
// SIG // sfawMG3sakmo6ZZ2yL0IxP479a5zNwayVs8Z1Lv1lMqH
// SIG // HPKAagFPthuBc7PTWyI/OlgY34juZ8RJpy/cJYs9XtDs
// SIG // NESRHbyRDHaCPu/E2C2hBAKOSPnv3QLPA6Iwggd6MIIF
// SIG // YqADAgECAgphDpDSAAAAAAADMA0GCSqGSIb3DQEBCwUA
// SIG // MIGIMQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMTIwMAYDVQQDEylN
// SIG // aWNyb3NvZnQgUm9vdCBDZXJ0aWZpY2F0ZSBBdXRob3Jp
// SIG // dHkgMjAxMTAeFw0xMTA3MDgyMDU5MDlaFw0yNjA3MDgy
// SIG // MTA5MDlaMH4xCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpX
// SIG // YXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYD
// SIG // VQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xKDAmBgNV
// SIG // BAMTH01pY3Jvc29mdCBDb2RlIFNpZ25pbmcgUENBIDIw
// SIG // MTEwggIiMA0GCSqGSIb3DQEBAQUAA4ICDwAwggIKAoIC
// SIG // AQCr8PpyEBwurdhuqoIQTTS68rZYIZ9CGypr6VpQqrgG
// SIG // OBoESbp/wwwe3TdrxhLYC/A4wpkGsMg51QEUMULTiQ15
// SIG // ZId+lGAkbK+eSZzpaF7S35tTsgosw6/ZqSuuegmv15ZZ
// SIG // ymAaBelmdugyUiYSL+erCFDPs0S3XdjELgN1q2jzy23z
// SIG // OlyhFvRGuuA4ZKxuZDV4pqBjDy3TQJP4494HDdVceaVJ
// SIG // KecNvqATd76UPe/74ytaEB9NViiienLgEjq3SV7Y7e1D
// SIG // kYPZe7J7hhvZPrGMXeiJT4Qa8qEvWeSQOy2uM1jFtz7+
// SIG // MtOzAz2xsq+SOH7SnYAs9U5WkSE1JcM5bmR/U7qcD60Z
// SIG // I4TL9LoDho33X/DQUr+MlIe8wCF0JV8YKLbMJyg4JZg5
// SIG // SjbPfLGSrhwjp6lm7GEfauEoSZ1fiOIlXdMhSz5SxLVX
// SIG // PyQD8NF6Wy/VI+NwXQ9RRnez+ADhvKwCgl/bwBWzvRvU
// SIG // VUvnOaEP6SNJvBi4RHxF5MHDcnrgcuck379GmcXvwhxX
// SIG // 24ON7E1JMKerjt/sW5+v/N2wZuLBl4F77dbtS+dJKacT
// SIG // KKanfWeA5opieF+yL4TXV5xcv3coKPHtbcMojyyPQDdP
// SIG // weGFRInECUzF1KVDL3SV9274eCBYLBNdYJWaPk8zhNqw
// SIG // iBfenk70lrC8RqBsmNLg1oiMCwIDAQABo4IB7TCCAekw
// SIG // EAYJKwYBBAGCNxUBBAMCAQAwHQYDVR0OBBYEFEhuZOVQ
// SIG // BdOCqhc3NyK1bajKdQKVMBkGCSsGAQQBgjcUAgQMHgoA
// SIG // UwB1AGIAQwBBMAsGA1UdDwQEAwIBhjAPBgNVHRMBAf8E
// SIG // BTADAQH/MB8GA1UdIwQYMBaAFHItOgIxkEO5FAVO4eqn
// SIG // xzHRI4k0MFoGA1UdHwRTMFEwT6BNoEuGSWh0dHA6Ly9j
// SIG // cmwubWljcm9zb2Z0LmNvbS9wa2kvY3JsL3Byb2R1Y3Rz
// SIG // L01pY1Jvb0NlckF1dDIwMTFfMjAxMV8wM18yMi5jcmww
// SIG // XgYIKwYBBQUHAQEEUjBQME4GCCsGAQUFBzAChkJodHRw
// SIG // Oi8vd3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01p
// SIG // Y1Jvb0NlckF1dDIwMTFfMjAxMV8wM18yMi5jcnQwgZ8G
// SIG // A1UdIASBlzCBlDCBkQYJKwYBBAGCNy4DMIGDMD8GCCsG
// SIG // AQUFBwIBFjNodHRwOi8vd3d3Lm1pY3Jvc29mdC5jb20v
// SIG // cGtpb3BzL2RvY3MvcHJpbWFyeWNwcy5odG0wQAYIKwYB
// SIG // BQUHAgIwNB4yIB0ATABlAGcAYQBsAF8AcABvAGwAaQBj
// SIG // AHkAXwBzAHQAYQB0AGUAbQBlAG4AdAAuIB0wDQYJKoZI
// SIG // hvcNAQELBQADggIBAGfyhqWY4FR5Gi7T2HRnIpsLlhHh
// SIG // Y5KZQpZ90nkMkMFlXy4sPvjDctFtg/6+P+gKyju/R6mj
// SIG // 82nbY78iNaWXXWWEkH2LRlBV2AySfNIaSxzzPEKLUtCw
// SIG // /WvjPgcuKZvmPRul1LUdd5Q54ulkyUQ9eHoj8xN9ppB0
// SIG // g430yyYCRirCihC7pKkFDJvtaPpoLpWgKj8qa1hJYx8J
// SIG // aW5amJbkg/TAj/NGK978O9C9Ne9uJa7lryft0N3zDq+Z
// SIG // KJeYTQ49C/IIidYfwzIY4vDFLc5bnrRJOQrGCsLGra7l
// SIG // stnbFYhRRVg4MnEnGn+x9Cf43iw6IGmYslmJaG5vp7d0
// SIG // w0AFBqYBKig+gj8TTWYLwLNN9eGPfxxvFX1Fp3blQCpl
// SIG // o8NdUmKGwx1jNpeG39rz+PIWoZon4c2ll9DuXWNB41sH
// SIG // nIc+BncG0QaxdR8UvmFhtfDcxhsEvt9Bxw4o7t5lL+yX
// SIG // 9qFcltgA1qFGvVnzl6UJS0gQmYAf0AApxbGbpT9Fdx41
// SIG // xtKiop96eiL6SJUfq/tHI4D1nvi/a7dLl+LrdXga7Oo3
// SIG // mXkYS//WsyNodeav+vyL6wuA6mk7r/ww7QRMjt/fdW1j
// SIG // kT3RnVZOT7+AVyKheBEyIXrvQQqxP/uozKRdwaGIm1dx
// SIG // Vk5IRcBCyZt2WwqASGv9eZ/BvW1taslScxMNelDNMYIV
// SIG // wDCCFbwCAQEwgZUwfjELMAkGA1UEBhMCVVMxEzARBgNV
// SIG // BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
// SIG // HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEo
// SIG // MCYGA1UEAxMfTWljcm9zb2Z0IENvZGUgU2lnbmluZyBQ
// SIG // Q0EgMjAxMQITMwAAAMTpifh6gVDp/wAAAAAAxDANBglg
// SIG // hkgBZQMEAgEFAKCBrjAZBgkqhkiG9w0BCQMxDAYKKwYB
// SIG // BAGCNwIBBDAcBgorBgEEAYI3AgELMQ4wDAYKKwYBBAGC
// SIG // NwIBFTAvBgkqhkiG9w0BCQQxIgQgatAQpH0NM4NvSQnw
// SIG // XyEw8/Hy7NsDvCespd0JQMYUSfgwQgYKKwYBBAGCNwIB
// SIG // DDE0MDKgFIASAE0AaQBjAHIAbwBzAG8AZgB0oRqAGGh0
// SIG // dHA6Ly93d3cubWljcm9zb2Z0LmNvbTANBgkqhkiG9w0B
// SIG // AQEFAASCAQBf2FHk+ahDhEOYlIxIaVwNmc7gI1VgMc/h
// SIG // c/gzOvzb4ASMTCfaHkzof0dAW0ENz6QpXy5SoWOKKeHF
// SIG // 2qqJ0a1D87jfX08USdN8v1RLAJJ8s5wyHm3nlvtzWWL4
// SIG // 4eQzAsZ3O197c+JKk2Qyc+ckfyydxR5GN9CvSBlcCxWE
// SIG // 2lW8hPYQDzOHWMYAsM4Z0B7Z1zHfDAuhND6EKqFwNo2b
// SIG // kj/p/tvDbVH/4vPA8RnLjRXLG+V4u9rWPo+dBFrGh4kE
// SIG // qUCBijxu4dtE4TWdwbGW7NyT88nAsaqx8DUv/8kyA/ih
// SIG // I17KmavV6Wlk66G58EyQv3Dxdjxgp8BbV5p+94ywOGqa
// SIG // oYITSjCCE0YGCisGAQQBgjcDAwExghM2MIITMgYJKoZI
// SIG // hvcNAQcCoIITIzCCEx8CAQMxDzANBglghkgBZQMEAgEF
// SIG // ADCCAT0GCyqGSIb3DQEJEAEEoIIBLASCASgwggEkAgEB
// SIG // BgorBgEEAYRZCgMBMDEwDQYJYIZIAWUDBAIBBQAEIGb7
// SIG // 4CeAxqPMiPYOPEAFP+ay6CPtcuK6+C5ewRzlhditAgZb
// SIG // KqO2u0kYEzIwMTgwNzA2MjMwMDIyLjU1N1owBwIBAYAC
// SIG // AfSggbmkgbYwgbMxCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xDTAL
// SIG // BgNVBAsTBE1PUFIxJzAlBgNVBAsTHm5DaXBoZXIgRFNF
// SIG // IEVTTjozMUM1LTMwQkEtN0M5MTElMCMGA1UEAxMcTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZaCCDs0wggTa
// SIG // MIIDwqADAgECAhMzAAAAoBqYeD5m2KrXAAAAAACgMA0G
// SIG // CSqGSIb3DQEBCwUAMHwxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // JjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBD
// SIG // QSAyMDEwMB4XDTE2MDkwNzE3NTY0OFoXDTE4MDkwNzE3
// SIG // NTY0OFowgbMxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpX
// SIG // YXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYD
// SIG // VQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xDTALBgNV
// SIG // BAsTBE1PUFIxJzAlBgNVBAsTHm5DaXBoZXIgRFNFIEVT
// SIG // TjozMUM1LTMwQkEtN0M5MTElMCMGA1UEAxMcTWljcm9z
// SIG // b2Z0IFRpbWUtU3RhbXAgU2VydmljZTCCASIwDQYJKoZI
// SIG // hvcNAQEBBQADggEPADCCAQoCggEBAOdsFOIw0WfSrQSu
// SIG // ttsiPegqKTXuoUGpG1PMPD34Lb0RDXjFBBEFa1hDlORj
// SIG // JB1lI+nFM9OQaxUO0XBJ6rPkImqU5W1jEubPaNR9aDZ3
// SIG // iHjNWbZGxrzISjl/9GuEMTpxq/QI3msctyTuH4tfh+h6
// SIG // YUw5Zq9Oo3KNQw11nLsOQKoLE+Us0HWlyAp2h/HdFek+
// SIG // 6L8mzeFqUhgCk3f9DxFeifG2CF6jUyVSvpVlQwD0vTuq
// SIG // OrRLbARSaSotn844fx43PzqHkLEeYx5Wodhgy7/Y0VpE
// SIG // fHCKHlP6J6msMaZrCp18rDCXoya2hKXEpfG8dcjJjPAY
// SIG // EUHlz8/YGD9NMwQjnBsCAwEAAaOCARswggEXMB0GA1Ud
// SIG // DgQWBBTIsMT3oRUCDmIXcDp+UjaRWpR2ATAfBgNVHSME
// SIG // GDAWgBTVYzpcijGQ80N7fEYbxTNoWoVtVTBWBgNVHR8E
// SIG // TzBNMEugSaBHhkVodHRwOi8vY3JsLm1pY3Jvc29mdC5j
// SIG // b20vcGtpL2NybC9wcm9kdWN0cy9NaWNUaW1TdGFQQ0Ff
// SIG // MjAxMC0wNy0wMS5jcmwwWgYIKwYBBQUHAQEETjBMMEoG
// SIG // CCsGAQUFBzAChj5odHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpL2NlcnRzL01pY1RpbVN0YVBDQV8yMDEwLTA3
// SIG // LTAxLmNydDAMBgNVHRMBAf8EAjAAMBMGA1UdJQQMMAoG
// SIG // CCsGAQUFBwMIMA0GCSqGSIb3DQEBCwUAA4IBAQAQCXkH
// SIG // lw+TLnC9SdY28FQ58kD2jz/SCXUc81rnaG5dOtU4KhNr
// SIG // Iq8wrRUfQdTMU0W5+L/nKM9QXys15uoe+/NfEPYnr70g
// SIG // edJabL5DCE4o3vpk3pil3lsmTcNpSSc7SjywoMBMk31G
// SIG // nSaCPLwugX3GtYIyCyWpXeBq4Nvi4XuqImLLBbcGPW5F
// SIG // vvLBmX6wC9AsroIAEberJ6uuIgyECTPQdQE7CrDLqiIv
// SIG // 5ARNp66Q9WR0+MxWbGEuviFXn4QXXLtyka154KQg6y4B
// SIG // 9B/S/ykMm9r4JuLLa4lQVaJpteTAWGmkKC59AGXyvUnD
// SIG // +r8zxplHPhtmic1Waqs762e1fVJSMIIGcTCCBFmgAwIB
// SIG // AgIKYQmBKgAAAAAAAjANBgkqhkiG9w0BAQsFADCBiDEL
// SIG // MAkGA1UEBhMCVVMxEzARBgNVBAgTCldhc2hpbmd0b24x
// SIG // EDAOBgNVBAcTB1JlZG1vbmQxHjAcBgNVBAoTFU1pY3Jv
// SIG // c29mdCBDb3Jwb3JhdGlvbjEyMDAGA1UEAxMpTWljcm9z
// SIG // b2Z0IFJvb3QgQ2VydGlmaWNhdGUgQXV0aG9yaXR5IDIw
// SIG // MTAwHhcNMTAwNzAxMjEzNjU1WhcNMjUwNzAxMjE0NjU1
// SIG // WjB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2FzaGlu
// SIG // Z3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UEChMV
// SIG // TWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQDEx1N
// SIG // aWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMDCCASIw
// SIG // DQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAKkdDbx3
// SIG // EYo6IOz8E5f1+n9plGt0VBDVpQoAgoX77XxoSyxfxcPl
// SIG // YcJ2tz5mK1vwFVMnBDEfQRsalR3OCROOfGEwWbEwRA/x
// SIG // YIiEVEMM1024OAizQt2TrNZzMFcmgqNFDdDq9UeBzb8k
// SIG // YDJYYEbyWEeGMoQedGFnkV+BVLHPk0ySwcSmXdFhE24o
// SIG // xhr5hoC732H8RsEnHSRnEnIaIYqvS2SJUGKxXf13Hz3w
// SIG // V3WsvYpCTUBR0Q+cBj5nf/VmwAOWRH7v0Ev9buWayrGo
// SIG // 8noqCjHw2k4GkbaICDXoeByw6ZnNPOcvRLqn9NxkvaQB
// SIG // wSAJk3jN/LzAyURdXhacAQVPIk0CAwEAAaOCAeYwggHi
// SIG // MBAGCSsGAQQBgjcVAQQDAgEAMB0GA1UdDgQWBBTVYzpc
// SIG // ijGQ80N7fEYbxTNoWoVtVTAZBgkrBgEEAYI3FAIEDB4K
// SIG // AFMAdQBiAEMAQTALBgNVHQ8EBAMCAYYwDwYDVR0TAQH/
// SIG // BAUwAwEB/zAfBgNVHSMEGDAWgBTV9lbLj+iiXGJo0T2U
// SIG // kFvXzpoYxDBWBgNVHR8ETzBNMEugSaBHhkVodHRwOi8v
// SIG // Y3JsLm1pY3Jvc29mdC5jb20vcGtpL2NybC9wcm9kdWN0
// SIG // cy9NaWNSb29DZXJBdXRfMjAxMC0wNi0yMy5jcmwwWgYI
// SIG // KwYBBQUHAQEETjBMMEoGCCsGAQUFBzAChj5odHRwOi8v
// SIG // d3d3Lm1pY3Jvc29mdC5jb20vcGtpL2NlcnRzL01pY1Jv
// SIG // b0NlckF1dF8yMDEwLTA2LTIzLmNydDCBoAYDVR0gAQH/
// SIG // BIGVMIGSMIGPBgkrBgEEAYI3LgMwgYEwPQYIKwYBBQUH
// SIG // AgEWMWh0dHA6Ly93d3cubWljcm9zb2Z0LmNvbS9QS0kv
// SIG // ZG9jcy9DUFMvZGVmYXVsdC5odG0wQAYIKwYBBQUHAgIw
// SIG // NB4yIB0ATABlAGcAYQBsAF8AUABvAGwAaQBjAHkAXwBT
// SIG // AHQAYQB0AGUAbQBlAG4AdAAuIB0wDQYJKoZIhvcNAQEL
// SIG // BQADggIBAAfmiFEN4sbgmD+BcQM9naOhIW+z66bM9TG+
// SIG // zwXiqf76V20ZMLPCxWbJat/15/B4vceoniXj+bzta1RX
// SIG // CCtRgkQS+7lTjMz0YBKKdsxAQEGb3FwX/1z5Xhc1mCRW
// SIG // S3TvQhDIr79/xn/yN31aPxzymXlKkVIArzgPF/UveYFl
// SIG // 2am1a+THzvbKegBvSzBEJCI8z+0DpZaPWSm8tv0E4XCf
// SIG // Mkon/VWvL/625Y4zu2JfmttXQOnxzplmkIz/amJ/3cVK
// SIG // C5Em4jnsGUpxY517IW3DnKOiPPp/fZZqkHimbdLhnPkd
// SIG // /DjYlPTGpQqWhqS9nhquBEKDuLWAmyI4ILUl5WTs9/S/
// SIG // fmNZJQ96LjlXdqJxqgaKD4kWumGnEcua2A5HmoDF0M2n
// SIG // 0O99g/DhO3EJ3110mCIIYdqwUB5vvfHhAN/nMQekkzr3
// SIG // ZUd46PioSKv33nJ+YWtvd6mBy6cJrDm77MbL2IK0cs0d
// SIG // 9LiFAR6A+xuJKlQ5slvayA1VmXqHczsI5pgt6o3gMy4S
// SIG // KfXAL1QnIffIrE7aKLixqduWsqdCosnPGUFN4Ib5Kpqj
// SIG // EWYw07t0MkvfY3v1mYovG8chr1m1rtxEPJdQcdeh0sVV
// SIG // 42neV8HR3jDA/czmTfsNv11P6Z0eGTgvvM9YBS7vDaBQ
// SIG // NdrvCScc1bN+NR4Iuto229Nfj950iEkSoYIDdjCCAl4C
// SIG // AQEwgeOhgbmkgbYwgbMxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // DTALBgNVBAsTBE1PUFIxJzAlBgNVBAsTHm5DaXBoZXIg
// SIG // RFNFIEVTTjozMUM1LTMwQkEtN0M5MTElMCMGA1UEAxMc
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZaIlCgEB
// SIG // MAkGBSsOAwIaBQADFQCEFVFlIouF63tVQNFYAxwNxXJv
// SIG // wKCBwjCBv6SBvDCBuTELMAkGA1UEBhMCVVMxEzARBgNV
// SIG // BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
// SIG // HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEN
// SIG // MAsGA1UECxMETU9QUjEnMCUGA1UECxMebkNpcGhlciBO
// SIG // VFMgRVNOOjRERTktMEM1RS0zRTA5MSswKQYDVQQDEyJN
// SIG // aWNyb3NvZnQgVGltZSBTb3VyY2UgTWFzdGVyIENsb2Nr
// SIG // MA0GCSqGSIb3DQEBBQUAAgUA3ulORzAiGA8yMDE4MDcw
// SIG // NjEwMTExOVoYDzIwMTgwNzA3MTAxMTE5WjB0MDoGCisG
// SIG // AQQBhFkKBAExLDAqMAoCBQDe6U5HAgEAMAcCAQACAhNU
// SIG // MAcCAQACAhtYMAoCBQDe6p/HAgEAMDYGCisGAQQBhFkK
// SIG // BAIxKDAmMAwGCisGAQQBhFkKAwGgCjAIAgEAAgMW42Ch
// SIG // CjAIAgEAAgMHoSAwDQYJKoZIhvcNAQEFBQADggEBAFlC
// SIG // bwohKFaeeCuZBaD6f0eh8MTMKz/2tTFlg1PhG8N8h3uC
// SIG // dWGULKzI6llx5fyGcU0qA6fIqAqG1aCpNWMtM+VhzlKX
// SIG // tSTzvTPj+BPhPfKdUUhmmmCZi99W5nc+58FBmR9YYPvl
// SIG // oZw7YgvRCMIuP3bo17N1jBlFFKEo7pcNaZah6MNMf71H
// SIG // RGWSbv+127Q7uiueluDvK6uzTWbMvxwmYcFMwZ4A39zt
// SIG // qXIjAMOF2y/4BGkBMXUXemwULwl7gqAKacOCTpEK/OhS
// SIG // pF+MYcWsZL+af5I7/1y9RY84kx7aNXCmDr/KZFWtnuA9
// SIG // nzabNKhk6K9s25vVUBIRsIN5HAwIUuYxggL1MIIC8QIB
// SIG // ATCBkzB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQD
// SIG // Ex1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMAIT
// SIG // MwAAAKAamHg+Ztiq1wAAAAAAoDANBglghkgBZQMEAgEF
// SIG // AKCCATIwGgYJKoZIhvcNAQkDMQ0GCyqGSIb3DQEJEAEE
// SIG // MC8GCSqGSIb3DQEJBDEiBCBieYuKGDv/X4S4mk6GcAUE
// SIG // gyfk2SXjhULC7+wxR1g2/DCB4gYLKoZIhvcNAQkQAgwx
// SIG // gdIwgc8wgcwwgbEEFIQVUWUii4Xre1VA0VgDHA3Fcm/A
// SIG // MIGYMIGApH4wfDELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQG
// SIG // A1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIw
// SIG // MTACEzMAAACgGph4PmbYqtcAAAAAAKAwFgQUXx9nHSww
// SIG // gHZoXFqGf3qHf+1zx/gwDQYJKoZIhvcNAQELBQAEggEA
// SIG // QVHfB737BHWvLqdqOWVRj7fp6t4MxbVlyafVfgDZ14/5
// SIG // Aw/+nkrNXiNe414pGlmTE8p8GKzTlahT8OGH/lUn11jI
// SIG // STyDdTx0mF5aqi5kFopnLdwtRyT4XbG7c496YRBxMiD5
// SIG // 3UjpzMplQ1ZXM2MvnYj6QU0pR5PQw4NzNiadxZDqtW3H
// SIG // kzaQSHb6zvFgGVGQcA+nOBmKrrw03jCI+dfymBYtLquE
// SIG // ZPLVIr7g+AvgyE7CPa0PncKh4fo5wBzRZ4FYPXysZPS6
// SIG // q8GIZQLqT0ZUG9fEypWt/WcMCAGq21+ZVRKbsbnOkG5z
// SIG // Ns6L8wUSx/psN8L6tT6gmJQsLfnlF0bbcA==
// SIG // End signature block

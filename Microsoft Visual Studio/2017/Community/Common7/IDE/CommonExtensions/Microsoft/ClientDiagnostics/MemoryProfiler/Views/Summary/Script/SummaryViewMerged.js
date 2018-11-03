var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//
// Copyright (C) Microsoft. All rights reserved.
//
//--------
// External CommonMerged references.  These are included explicitly in the csproj
// as the CommonMerged.d.ts is generated at build-time.
// If we reference them here, TSC 1.8.10 includes the source in the merged JS file
// which is not what we want.
//--------
// <reference path="../../Common/Util/keyCodes.ts" />
// <reference path="../../Common/Controls/templateControl.ts" />
// <reference path="../../Common/Util/formattingHelpers.ts" />
// <reference path="../../Common/controls/componentModel.ts" />
// <reference path="../../Common/Profiler/SnapshotSummary.ts" />
//--------
/// <reference path="../../../../../common/script/Hub/plugin.redirect.d.ts" />
/// <reference path="SummaryView.ts" />
var MemoryProfiler;
(function (MemoryProfiler) {
    var Summary;
    (function (Summary) {
        "use strict";
        var SnapshotTileViewModel = (function (_super) {
            __extends(SnapshotTileViewModel, _super);
            function SnapshotTileViewModel(summary, snapshotSummaryCollection) {
                _super.call(this);
                this._summary = summary;
                this._snapshotSummaryCollection = snapshotSummaryCollection;
            }
            Object.defineProperty(SnapshotTileViewModel.prototype, "summaryData", {
                get: function () { return this._summary; },
                set: function (v) {
                    this._summary = v;
                    this.raisePropertyChanged("summaryData");
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "timeTaken", {
                get: function () {
                    var date = new Date(this._summary.snapshot.timestamp);
                    return "(" + date.toLocaleTimeString() + ")";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "nativeSize", {
                get: function () {
                    return this.summaryData.nativeTotalSize;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "nativeSizeDisplayString", {
                get: function () {
                    return MemoryProfiler.Common.FormattingHelpers.getPrettyPrintSize(this.nativeSize);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "nativeCount", {
                get: function () {
                    return this.summaryData.nativeTotalCount;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "nativeCountDisplayString", {
                get: function () {
                    return Microsoft.Plugin.Resources.getString("NativeCount", MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(this.nativeCount, true));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "nativeSizeDiff", {
                get: function () {
                    var previousSnapshot = this.getPreviousSnapshot();
                    if (previousSnapshot) {
                        return this._summary.nativeTotalSize - previousSnapshot.nativeTotalSize;
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "nativeSizeDiffDisplayString", {
                get: function () {
                    if (this.nativeSizeDiff === 0) {
                        return Microsoft.Plugin.Resources.getString("NoDiff");
                    }
                    else {
                        return MemoryProfiler.Common.FormattingHelpers.getPrettyPrintSize(this.nativeSizeDiff, true);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "nativeCountDiff", {
                get: function () {
                    var previousSnapshot = this.getPreviousSnapshot();
                    if (previousSnapshot) {
                        return this._summary.nativeTotalCount - previousSnapshot.nativeTotalCount;
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "nativeCountDiffDisplayString", {
                get: function () {
                    if (this.nativeCountDiff === 0) {
                        return Microsoft.Plugin.Resources.getString("NoDiff");
                    }
                    else {
                        return MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(this.nativeCountDiff, true, true);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "managedSize", {
                get: function () {
                    return this.summaryData.managedTotalSize;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "managedSizeDisplayString", {
                get: function () {
                    return MemoryProfiler.Common.FormattingHelpers.getPrettyPrintSize(this.managedSize);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "managedCount", {
                get: function () {
                    return this.summaryData.managedTotalCount;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "managedCountDisplayString", {
                get: function () {
                    return Microsoft.Plugin.Resources.getString("ManagedCount", MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(this.managedCount, true));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "managedSizeDiff", {
                get: function () {
                    var previousSnapshot = this.getPreviousSnapshot();
                    if (previousSnapshot) {
                        return this._summary.managedTotalSize - previousSnapshot.managedTotalSize;
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "managedSizeDiffDisplayString", {
                get: function () {
                    if (this.managedSizeDiff === 0) {
                        return Microsoft.Plugin.Resources.getString("NoDiff");
                    }
                    else {
                        return MemoryProfiler.Common.FormattingHelpers.getPrettyPrintSize(this.managedSizeDiff, true);
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "managedCountDiff", {
                get: function () {
                    var previousSnapshot = this.getPreviousSnapshot();
                    if (previousSnapshot) {
                        return this._summary.managedTotalCount - previousSnapshot.managedTotalCount;
                    }
                    return 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "managedCountDiffDisplayString", {
                get: function () {
                    if (this.managedCountDiff === 0) {
                        return Microsoft.Plugin.Resources.getString("NoDiff");
                    }
                    else {
                        return MemoryProfiler.Common.FormattingHelpers.getDecimalLocaleString(this.managedCountDiff, true, true);
                    }
                },
                enumerable: true,
                configurable: true
            });
            SnapshotTileViewModel.prototype.getComparableSnapshots = function () {
                var result = [];
                for (var i = 0; i < this._snapshotSummaryCollection.length; i++) {
                    var summary = this._snapshotSummaryCollection.getItem(i);
                    if (summary.id !== this._summary.id) {
                        result.push(summary);
                    }
                }
                return result;
            };
            Object.defineProperty(SnapshotTileViewModel.prototype, "isFirstSnapshot", {
                get: function () {
                    return this.getPreviousSnapshot() === null;
                },
                enumerable: true,
                configurable: true
            });
            // Note we assume id === array index
            SnapshotTileViewModel.prototype.getPreviousSnapshot = function () {
                var previousId = this._summary.id - 1;
                if (previousId >= 0 && previousId < this._snapshotSummaryCollection.length) {
                    return this._snapshotSummaryCollection.getItem(previousId);
                }
                return null;
            };
            return SnapshotTileViewModel;
        }(MemoryProfiler.Common.Controls.ObservableViewModel));
        Summary.SnapshotTileViewModel = SnapshotTileViewModel;
        var SnapshotTileView = (function (_super) {
            __extends(SnapshotTileView, _super);
            function SnapshotTileView(controller, model) {
                _super.call(this, "SnapshotTileTemplate");
                this._controller = controller;
                this._model = model;
                this._controller.model.registerPropertyChanged(this);
                this._model.registerPropertyChanged(this);
                this._tileContextMenuItems = [];
                this._snapshotTile = this.findElement("snapshotTile");
                this._tileHeader = this.findElement("snapshotTileHeader");
                this.findElement("snapshotTileTitle").innerText = Microsoft.Plugin.Resources.getString("SnapshotNumber", this._model.summaryData.id + 1);
                this._screenshotHolder = this.findElement("snapshotTileImage");
                this._screenshotNotAvailableMessage = this.findElement("screenshotNotAvailableMessage");
                if (this._model.summaryData.snapshot.screenshotFile) {
                    this._screenshotHolder.src = this._model.summaryData.snapshot.screenshotFile;
                    this._screenshotNotAvailableMessage.style.display = "none";
                }
                this.findElement("snapshotTakenDate").innerText = this._model.timeTaken;
                this._screenshotNotAvailableMessage.innerText = Microsoft.Plugin.Resources.getString("ScreenshotNotAvailable");
                this._snapshotLoadingProgress = this.findElement("loadingSnapshotProgress");
                this.populateContextMenu();
                this.updateUI();
            }
            SnapshotTileView.prototype.updateUI = function () {
                this.populateWarningsSection();
                this.populateSummaryLinks();
                this.updateSnapshotDisplayType();
                this.updateLoadingProgress();
            };
            SnapshotTileView.prototype.populateWarningsSection = function () {
                this.findElement("snapshotTileWarnings").style.visibility = "hidden";
            };
            SnapshotTileView.prototype.onPropertyChanged = function (propertyName) {
                switch (propertyName) {
                    case "snapshotDisplayType":
                        this.updateSnapshotDisplayType();
                        break;
                    case "summaryData":
                        this.updateUI();
                        break;
                }
            };
            SnapshotTileView.prototype.updateLoadingProgress = function () {
                if (this._model.summaryData.isProcessingCompleted) {
                    this._screenshotHolder.style.visibility = "";
                    this._screenshotNotAvailableMessage.style.visibility = "";
                    this._snapshotLoadingProgress.style.visibility = "hidden";
                    this.updateSnapshotDisplayType();
                }
                else {
                    this._managedSummaryDiv.style.visibility = "hidden";
                    this._nativeSummaryDiv.style.visibility = "hidden";
                    this._screenshotHolder.style.visibility = "hidden";
                    this._screenshotNotAvailableMessage.style.visibility = "hidden";
                    this._snapshotLoadingProgress.style.visibility = "";
                }
            };
            SnapshotTileView.prototype.updateSnapshotDisplayType = function () {
                if (this._controller.model.snapshotDisplayType === Summary.SnapshotDisplayType.managed) {
                    this._managedSummaryDiv.style.visibility = this._model.summaryData.isProcessingCompleted ? "" : "hidden";
                    this._nativeSummaryDiv.style.visibility = "hidden";
                }
                else if (this._controller.model.snapshotDisplayType === Summary.SnapshotDisplayType.native) {
                    this._managedSummaryDiv.style.visibility = "hidden";
                    this._nativeSummaryDiv.style.visibility = this._model.summaryData.isProcessingCompleted ? "" : "hidden";
                }
            };
            SnapshotTileView.prototype.onCollectionChanged = function (eventArgs) {
                if (eventArgs.action === MemoryProfiler.Common.Controls.NotifyCollectionChangedAction.Add) {
                    var newSummary = eventArgs.newItems[0];
                    if (this._model.summaryData.id !== newSummary.id) {
                        var contextMenuItem = {
                            callback: this.onDiffToSnapshot.bind(this, newSummary.id),
                            disabled: this.shouldDisableCompareMenu.bind(this),
                            label: Microsoft.Plugin.Resources.getString("SnapshotNumber", newSummary.id + 1),
                            type: Microsoft.Plugin.ContextMenu.MenuItemType.command
                        };
                        this._tileContextMenuItems.push(contextMenuItem);
                    }
                    this.createContextMenu();
                }
            };
            SnapshotTileView.prototype.createContextMenu = function () {
                if (this._tileContextMenu) {
                    this._tileContextMenu.detach(this._snapshotTile);
                }
                if (this._tileContextMenuItems.length > 0) {
                    var compareToMenuItem = {
                        callback: function () { },
                        label: Microsoft.Plugin.Resources.getString("CompareTo"),
                        disabled: this.shouldDisableCompareMenu.bind(this),
                        submenu: this._tileContextMenuItems,
                        type: Microsoft.Plugin.ContextMenu.MenuItemType.command
                    };
                    this._tileContextMenu = Microsoft.Plugin.ContextMenu.create([compareToMenuItem]);
                    this._tileContextMenu.attach(this._snapshotTile);
                }
            };
            SnapshotTileView.prototype.shouldDisableCompareMenu = function () {
                return this._controller.model.restoringSnapshots;
            };
            SnapshotTileView.prototype.populateContextMenu = function () {
                var comparableSnapshots = this._model.getComparableSnapshots();
                for (var i = 0; i < comparableSnapshots.length; i++) {
                    var comparable = comparableSnapshots[i];
                    var contextMenuItem = {
                        callback: this.onDiffToSnapshot.bind(this, comparable.id),
                        disabled: this.shouldDisableCompareMenu.bind(this),
                        label: Microsoft.Plugin.Resources.getString("SnapshotNumber", comparable.id + 1),
                        type: Microsoft.Plugin.ContextMenu.MenuItemType.command
                    };
                    this._tileContextMenuItems.push(contextMenuItem);
                }
                this.createContextMenu();
            };
            SnapshotTileView.prototype.populateSummaryLinks = function () {
                // Managed data
                this._managedSummaryDiv = this.findElement("managedSummaryData");
                var managedCountLink = this.findElement("managedCountLink");
                var managedSizeLink = this.findElement("managedSizeLink");
                var managedCountDiffLink = this.findElement("managedCountDiffLink");
                var managedCountDiffIndicatorIcon = this.findElement("managedCountDiffIndicatorIcon");
                var managedSizeDiffLink = this.findElement("managedSizeDiffLink");
                var managedSizeDiffIndicatorIcon = this.findElement("managedSizeDiffIndicatorIcon");
                managedCountLink.innerText = this._model.managedCountDisplayString;
                managedSizeLink.innerText = this._model.managedSizeDisplayString;
                managedSizeLink.setAttribute("data-plugin-vs-tooltip", Microsoft.Plugin.Resources.getString("ManagedSizeLinkTooltip"));
                managedCountLink.setAttribute("data-plugin-vs-tooltip", Microsoft.Plugin.Resources.getString("ManagedCountLinkTooltip"));
                managedSizeLink.onclick = this.onManagedSizeClick.bind(this);
                managedCountLink.onclick = this.onManagedCountClick.bind(this);
                if (!this._model.isFirstSnapshot) {
                    managedSizeDiffLink.onclick = this.onManagedSizeDiffClick.bind(this);
                    managedCountDiffLink.onclick = this.onManagedCountDiffClick.bind(this);
                }
                this.populateDiffLinks(managedSizeDiffLink, managedSizeDiffIndicatorIcon, this._model.managedSizeDiff, this._model.managedSizeDiffDisplayString, Microsoft.Plugin.Resources.getString("ManagedSizeDiffLinkTooltip"));
                this.populateDiffLinks(managedCountDiffLink, managedCountDiffIndicatorIcon, this._model.managedCountDiff, this._model.managedCountDiffDisplayString, Microsoft.Plugin.Resources.getString("ManagedCountDiffLinkTooltip"));
                // Native data
                this._nativeSummaryDiv = this.findElement("nativeSummaryData");
                var nativeCountLink = this.findElement("nativeCountLink");
                var nativeSizeLink = this.findElement("nativeSizeLink");
                var nativeCountDiffLink = this.findElement("nativeCountDiffLink");
                var nativeCountDiffIndicatorIcon = this.findElement("nativeCountDiffIndicatorIcon");
                var nativeSizeDiffLink = this.findElement("nativeSizeDiffLink");
                var nativeSizeDiffIndicatorIcon = this.findElement("nativeSizeDiffIndicatorIcon");
                nativeCountLink.innerText = this._model.nativeCountDisplayString;
                nativeSizeLink.innerText = this._model.nativeSizeDisplayString;
                nativeCountLink.setAttribute("data-plugin-vs-tooltip", Microsoft.Plugin.Resources.getString("NativeCountLinkTooltip"));
                nativeSizeLink.setAttribute("data-plugin-vs-tooltip", Microsoft.Plugin.Resources.getString("NativeSizeLinkTooltip"));
                nativeSizeLink.onclick = this.onNativeSizeClick.bind(this);
                nativeCountLink.onclick = this.onNativeCountClick.bind(this);
                if (!this._model.isFirstSnapshot) {
                    nativeSizeDiffLink.onclick = this.onNativeSizeDiffClick.bind(this);
                    nativeCountDiffLink.onclick = this.onNativeCountDiffClick.bind(this);
                }
                this.populateDiffLinks(nativeSizeDiffLink, nativeSizeDiffIndicatorIcon, this._model.nativeSizeDiff, this._model.nativeSizeDiffDisplayString, Microsoft.Plugin.Resources.getString("NativeSizeDiffLinkTooltip"));
                this.populateDiffLinks(nativeCountDiffLink, nativeCountDiffIndicatorIcon, this._model.nativeCountDiff, this._model.nativeCountDiffDisplayString, Microsoft.Plugin.Resources.getString("NativeCountDiffLinkTooltip"));
                var links = this.findElementsByClassName("BPT-FileLink");
                for (var linkIndex = 0; linkIndex < links.length; linkIndex++) {
                    var linkElement = links[linkIndex];
                    linkElement.onkeydown = this.onLinkElementKeyDown.bind(linkElement);
                }
            };
            SnapshotTileView.prototype.onLinkElementKeyDown = function (e) {
                if ((e.keyCode === MemoryProfiler.Common.KeyCodes.ENTER || e.keyCode === MemoryProfiler.Common.KeyCodes.SPACE) && !e.ctrlKey && !e.altKey && !e.shiftKey) {
                    e.srcElement.click();
                }
            };
            SnapshotTileView.prototype.populateDiffLinks = function (element, iconElement, delta, deltaDisplayString, deltaTooltip) {
                if (!this._model.isFirstSnapshot) {
                    element.innerText = deltaDisplayString;
                    element.setAttribute("data-plugin-vs-tooltip", deltaTooltip);
                    if (delta > 0) {
                        iconElement.classList.add("increaseIcon");
                    }
                    else if (delta < 0) {
                        iconElement.classList.add("decreaseIcon");
                    }
                }
                else {
                    element.classList.remove("BPT-FileLink");
                    element.classList.add("baselineText");
                    element.innerText = Microsoft.Plugin.Resources.getString("Baseline");
                    element.tabIndex = -1;
                }
            };
            SnapshotTileView.prototype.onManagedSizeClick = function (e) {
                this._controller.openManagedSizeDetails(this._model.summaryData.id);
            };
            SnapshotTileView.prototype.onManagedCountClick = function (e) {
                this._controller.openManagedCountDetails(this._model.summaryData.id);
            };
            SnapshotTileView.prototype.onManagedSizeDiffClick = function (e) {
                this._controller.openManagedSizeDiffDetails(this._model.summaryData.id);
            };
            SnapshotTileView.prototype.onManagedCountDiffClick = function (e, target) {
                this._controller.openManagedCountDiffDetails(this._model.summaryData.id);
            };
            SnapshotTileView.prototype.onNativeSizeClick = function (e) {
                this._controller.openNativeSizeDetails(this._model.summaryData.id);
            };
            SnapshotTileView.prototype.onNativeCountClick = function (e) {
                this._controller.openNativeCountDetails(this._model.summaryData.id);
            };
            SnapshotTileView.prototype.onNativeSizeDiffClick = function (e) {
                this._controller.openNativeSizeDiffDetails(this._model.summaryData.id);
            };
            SnapshotTileView.prototype.onNativeCountDiffClick = function (e, target) {
                this._controller.openNativeCountDiffDetails(this._model.summaryData.id);
            };
            SnapshotTileView.prototype.onDiffToSnapshot = function (id) {
                if (this._controller.model.snapshotDisplayType == Summary.SnapshotDisplayType.managed) {
                    this._controller.openManagedSnapshotDiffDetails(this._model.summaryData.id, id);
                }
                else {
                    this._controller.openNativeSnapshotDiffDetails(this._model.summaryData.id, id);
                }
            };
            return SnapshotTileView;
        }(MemoryProfiler.Common.Controls.TemplateControl));
        Summary.SnapshotTileView = SnapshotTileView;
    })(Summary = MemoryProfiler.Summary || (MemoryProfiler.Summary = {}));
})(MemoryProfiler || (MemoryProfiler = {}));
//
// Copyright (C) Microsoft. All rights reserved.
//
//--------
// External CommonMerged references.  These are included explicitly in the csproj
// as the CommonMerged.d.ts is generated at build-time.
// If we reference them here, TSC 1.8.10 includes the source in the merged JS file
// which is not what we want.
//--------
// <reference path="../../common/controls/componentModel.ts" />
// <reference path="../../common/controls/templateControl.ts" />
// <reference path="../../common/util/errorFormatter.ts" />
// <reference path="../../common/Profiler/MemoryProfilerViewHost.ts" />
// <reference path="../../common/Profiler/Snapshot.ts" />
// <reference path="../../common/Profiler/SnapshotSummary.ts" />
// <reference path="../../common/Profiler/SnapshotEngine.ts" />
// <reference path="../../common/Profiler/SummaryEngine.ts" />
// <reference path="../../common/Profiler/SummaryAgent.ts" />
// <reference path="../../common/Profiler/ClrSnapshotAgent.ts" />
// <reference path="../../common/Profiler/ScreenshotSnapshotAgent.ts" />
// <reference path="../../common/Profiler/NativeSummaryAgent.ts" />
// <reference path="../../common/Profiler/ManagedSummaryAgent.ts" />
// <reference path="../../common/Profiler/FeedbackConstants.ts" />
//--------
/// <reference path="snapshotTileView.ts" />
/// <reference path="snapshotHeapTypeToggle.ts" />
var MemoryProfiler;
(function (MemoryProfiler) {
    var Summary;
    (function (Summary) {
        "use strict";
        var Common = MemoryProfiler.Common;
        var SummaryViewController = (function () {
            function SummaryViewController(sessionInfo) {
                this._pendingSnapshots = [];
                this._summaryAgents = [];
                Common.MemoryProfilerViewHost.startCodeMarker(Common.CodeMarkerValues.perfMP_ViewLoadStart, Common.CodeMarkerValues.perfMP_ViewLoadEnd);
                this.model = new SummaryViewModel();
                this.view = new SummaryView(this, this.model);
                // DiagHub uses the documentSessionId as the subdomain for ScriptedControls it creates. Since our tool creates details view
                // on its own it needs to know the documentSessionId of the active session so that Daytona would not create a new ScriptedBox
                // Process to run the new control on.
                this._loadDataWarehousePromise = Microsoft.VisualStudio.DiagnosticsHub.DataWarehouse.loadDataWarehouse();
                this._loadDataWarehousePromise.then(function (dataWareHouse) {
                    Common.MemoryProfilerViewHost.session.setScriptedContextId(dataWareHouse.getConfiguration().sessionId);
                });
                if (sessionInfo.snapshots.length === 0) {
                    this.model.warningMessage = Microsoft.Plugin.Resources.getString("NoSnapshotsTakenWarning");
                    ;
                    Common.MemoryProfilerViewHost.endCodeMarker(Common.CodeMarkerValues.perfMP_ViewLoadStart);
                    return;
                }
                this.loadExistingSnapshots(sessionInfo);
                // Determine what heaps we're supporting.  If supporting managed + native, we need a toggle-bar.
                // Until we hook up User Settings, we only know if target is managed(+native), or just native
                // Once we have User Settings, we'll have a 3rd option: managed-only
                if (sessionInfo.targetRuntime === Common.Extensions.TargetRuntime.mixed) {
                    this.view.initializeToggleBar();
                }
                else if (sessionInfo.targetRuntime === Common.Extensions.TargetRuntime.native) {
                    // We default to MANAGED unless we're only showing native.
                    this.model.snapshotDisplayType = Summary.SnapshotDisplayType.native;
                }
            }
            SummaryViewController.prototype.loadExistingSnapshots = function (sessioninfo) {
                var _this = this;
                var snapshots = sessioninfo.snapshots;
                var snapshotAgents = [];
                Common.MemoryProfilerViewHost.session.logBeginLoadSnapshots();
                snapshotAgents.push(new Common.ScreenshotSnapshotAgent());
                if (sessioninfo.targetRuntime !== Common.Extensions.TargetRuntime.native) {
                    snapshotAgents.push(new Common.ClrSnapshotAgent());
                    this._summaryAgents.push(new Common.ManagedSummaryAgent());
                }
                if (sessioninfo.targetRuntime !== Common.Extensions.TargetRuntime.managed) {
                    this._summaryAgents.push(new Common.NativeSummaryAgent(this._loadDataWarehousePromise));
                }
                this.model.restoringSnapshots = true;
                this._pendingSnapshots = [];
                for (var i = 0; i < snapshots.length; i++) {
                    var restoreEngine = new Common.SnapshotRestoreEngine(i, snapshotAgents, snapshots[i]);
                    restoreEngine.restore(function (snapshot) {
                        _this._pendingSnapshots.push(snapshot);
                        _this.model.snapshotSummaryCollection.add(new Common.SnapshotSummary(snapshot));
                    });
                }
                // OK, restoration complete.  That should have been the quick & easy part.
                // Initialize each summary agent in parallel
                Common.MemoryProfilerViewHost.session.getSessionStartupTime().then(function (sessionStartTime) {
                    var promises = [];
                    _this._summaryAgents.forEach(function (agent) {
                        promises.push(agent.initializeAnalyzerData(sessionStartTime, _this._pendingSnapshots));
                    });
                    return Microsoft.Plugin.Promise.join(promises);
                }).done(function () {
                    // Now, we kick off analysis by reversing the queue and popping of the first snapshot to tackle
                    _this._pendingSnapshots.reverse();
                    _this.processNextSnapshotSummary();
                });
            };
            SummaryViewController.prototype.openManagedSizeDetails = function (snapshotId) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenManagedHeapViewBySize, Common.FeedbackCommandInvokeMethodNames.Control, Common.FeedbackCommandSourceNames.SummaryView);
                this.viewSnapshot(snapshotId, "ManagedHeap", "RetainedSize");
            };
            SummaryViewController.prototype.openManagedCountDetails = function (snapshotId) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenManagedHeapViewByCount, Common.FeedbackCommandInvokeMethodNames.Control, Common.FeedbackCommandSourceNames.SummaryView);
                this.viewSnapshot(snapshotId, "ManagedHeap", "Count");
            };
            SummaryViewController.prototype.openManagedSizeDiffDetails = function (snapshotId) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenDiffManagedHeapViewBySize, Common.FeedbackCommandInvokeMethodNames.Control, Common.FeedbackCommandSourceNames.SummaryView);
                this.compareSnapshots(snapshotId, snapshotId - 1, "ManagedHeap", "RetainedSizeDiff");
            };
            SummaryViewController.prototype.openManagedCountDiffDetails = function (snapshotId) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenDiffManagedHeapViewByCount, Common.FeedbackCommandInvokeMethodNames.Control, Common.FeedbackCommandSourceNames.SummaryView);
                this.compareSnapshots(snapshotId, snapshotId - 1, "ManagedHeap", "CountDiff");
            };
            SummaryViewController.prototype.openManagedSnapshotDiffDetails = function (snapshotId1, snapshotId2) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenDiffManagedHeapView, Common.FeedbackCommandInvokeMethodNames.Menu, Common.FeedbackCommandSourceNames.SummaryView);
                this.compareSnapshots(Math.max(snapshotId1, snapshotId2), Math.min(snapshotId1, snapshotId2), "ManagedHeap", "RetainedSizeDiff");
            };
            SummaryViewController.prototype.openNativeSizeDetails = function (snapshotId) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenNativeHeapViewBySize, Common.FeedbackCommandInvokeMethodNames.Control, Common.FeedbackCommandSourceNames.SummaryView);
                this.viewSnapshot(snapshotId, "NativeHeap", "OutstandingSize");
            };
            SummaryViewController.prototype.openNativeCountDetails = function (snapshotId) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenNativeHeapViewByCount, Common.FeedbackCommandInvokeMethodNames.Control, Common.FeedbackCommandSourceNames.SummaryView);
                this.viewSnapshot(snapshotId, "NativeHeap", "OutstandingCount");
            };
            SummaryViewController.prototype.openNativeSizeDiffDetails = function (snapshotId) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenDiffNativeHeapViewBySize, Common.FeedbackCommandInvokeMethodNames.Control, Common.FeedbackCommandSourceNames.SummaryView);
                this.compareSnapshots(snapshotId, snapshotId - 1, "NativeHeap", "OutstandingSizeDiff");
            };
            SummaryViewController.prototype.openNativeCountDiffDetails = function (snapshotId) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenDiffNativeHeapViewByCount, Common.FeedbackCommandInvokeMethodNames.Control, Common.FeedbackCommandSourceNames.SummaryView);
                this.compareSnapshots(snapshotId, snapshotId - 1, "NativeHeap", "OutstandingCountDiff");
            };
            SummaryViewController.prototype.openNativeSnapshotDiffDetails = function (snapshotId1, snapshotId2) {
                Common.MemoryProfilerViewHost.session.logCommandUsage(Common.FeedbackCommandNames.OpenDiffNativeHeapView, Common.FeedbackCommandInvokeMethodNames.Menu, Common.FeedbackCommandSourceNames.SummaryView);
                this.compareSnapshots(Math.max(snapshotId1, snapshotId2), Math.min(snapshotId1, snapshotId2), "NativeHeap", "OutstandingSizeDiff");
            };
            SummaryViewController.prototype.viewSnapshot = function (snapshotId, target, sortProperty) {
                Common.MemoryProfilerViewHost.session.openSnapshotDetails(snapshotId, target, sortProperty);
            };
            SummaryViewController.prototype.compareSnapshots = function (lastSnapshotId, firstSnapshotId, target, sortProperty) {
                Common.MemoryProfilerViewHost.session.openSnapshotDiff(firstSnapshotId, lastSnapshotId, target, sortProperty);
            };
            SummaryViewController.prototype.reset = function () {
                this.model.snapshotSummaryCollection.clear();
                Common.MemoryProfilerViewHost.onIdle();
            };
            SummaryViewController.prototype.processNextSnapshotSummary = function () {
                if (this._pendingSnapshots.length == 0) {
                    this.summaryProcessCleanup();
                }
                else {
                    var snapshot = this._pendingSnapshots.pop();
                    this._summaryEngine = new Common.SummaryEngine(snapshot, this._summaryAgents);
                    this._summaryEngine.processSummary().done(this.onSummaryProcessComplete.bind(this), this.onSummaryProcessError.bind(this), this.onSummaryProcessProgress.bind(this));
                }
            };
            SummaryViewController.prototype.cancelSummaryProcessing = function () {
                if (this._summaryEngine) {
                    this._summaryEngine.cancel();
                    this.summaryProcessCleanup();
                }
            };
            SummaryViewController.prototype.onSummaryProcessComplete = function (summary) {
                for (var i = 0; i < this.model.snapshotSummaryCollection.length; i++) {
                    if (this.model.snapshotSummaryCollection.getItem(i).id === summary.id) {
                        this.model.snapshotSummaryCollection.replace(i, summary);
                        break;
                    }
                }
                this.processNextSnapshotSummary();
            };
            SummaryViewController.prototype.onSummaryProcessError = function (error) {
                /// need to report the error!
                this.summaryProcessCleanup();
            };
            SummaryViewController.prototype.onSummaryProcessProgress = function (progress) {
                // UI during analysis would be nice :)
            };
            SummaryViewController.prototype.summaryProcessCleanup = function () {
                this._summaryEngine = null;
                this._summaryAgents = null;
                this._pendingSnapshots = [];
                this.model.restoringSnapshots = false;
                // If we had snapshots to restore, we're now done loading the view
                //
                // !! NOTE: The order of code markers is important for automation. !!
                // We need to make sure ViewLoad fires after RestoringSnapshots
                // (fired by setting restoringSnapshots above).
                //
                Common.MemoryProfilerViewHost.endCodeMarker(Common.CodeMarkerValues.perfMP_ViewLoadStart);
                Common.MemoryProfilerViewHost.session.logEndLoadSnapshots();
            };
            return SummaryViewController;
        }());
        Summary.SummaryViewController = SummaryViewController;
        var SummaryViewModel = (function (_super) {
            __extends(SummaryViewModel, _super);
            function SummaryViewModel() {
                _super.call(this);
                this._warningMessage = "";
                this._restoringSnapshots = false;
                this._snapshotDisplayType = Summary.SnapshotDisplayType.managed;
                this._snapshotSummaryCollection = new Common.Controls.ObservableCollection();
                // Note: In the future, we may have per-view default settings. For now, log the defaults as coming from the corresponding views.
                this.LogSelectSnapshotViewCommand(this.snapshotDisplayType, Common.FeedbackCommandInvokeMethodNames.Default, Common.FeedbackCommandSourceNames.SummaryView);
            }
            Object.defineProperty(SummaryViewModel.prototype, "snapshotSummaryCollection", {
                get: function () { return this._snapshotSummaryCollection; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SummaryViewModel.prototype, "warningMessage", {
                get: function () { return this._warningMessage; },
                set: function (v) {
                    if (this._warningMessage !== v) {
                        this._warningMessage = v;
                        this.raisePropertyChanged("warningMessage");
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SummaryViewModel.prototype, "snapshotDisplayType", {
                get: function () { return this._snapshotDisplayType; },
                set: function (v) {
                    if (this._snapshotDisplayType !== v) {
                        this._snapshotDisplayType = v;
                        this.LogSelectSnapshotViewCommand(v, Common.FeedbackCommandInvokeMethodNames.Control, Common.FeedbackCommandSourceNames.SummaryView);
                        this.raisePropertyChanged("snapshotDisplayType");
                    }
                },
                enumerable: true,
                configurable: true
            });
            SummaryViewModel.prototype.LogSelectSnapshotViewCommand = function (v, invokeMethodName, commandSourceName) {
                var feedbackCommandName;
                if (v === Summary.SnapshotDisplayType.managed) {
                    feedbackCommandName = Common.FeedbackCommandNames.SelectManagedHeapSnapshotView;
                }
                else {
                    feedbackCommandName = Common.FeedbackCommandNames.SelectNativeHeapSnapshotView;
                }
                Common.MemoryProfilerViewHost.session.logCommandUsage(feedbackCommandName, invokeMethodName, commandSourceName);
            };
            Object.defineProperty(SummaryViewModel.prototype, "restoringSnapshots", {
                get: function () {
                    return this._restoringSnapshots;
                },
                set: function (v) {
                    if (this._restoringSnapshots !== v) {
                        this._restoringSnapshots = v;
                        this.raisePropertyChanged("restoringSnapshots");
                        if (this._restoringSnapshots) {
                            Common.MemoryProfilerViewHost.startCodeMarker(Common.CodeMarkerValues.perfMP_SnapshotRestoreStart, Common.CodeMarkerValues.perfMP_SnapshotRestoreEnd);
                        }
                        else {
                            Common.MemoryProfilerViewHost.endCodeMarker(Common.CodeMarkerValues.perfMP_SnapshotRestoreStart);
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            return SummaryViewModel;
        }(Common.Controls.ObservableViewModel));
        Summary.SummaryViewModel = SummaryViewModel;
        var SummaryView = (function (_super) {
            __extends(SummaryView, _super);
            function SummaryView(controller, model) {
                _super.call(this, "SummaryViewTemplate");
                this._controller = controller;
                this._model = model;
                this._snapshotTileViewModelCollection = [];
                this._model.registerPropertyChanged(this);
                this._model.snapshotSummaryCollection.registerCollectionChanged(this);
                this._tilesContainer = this.findElement("tilesContainer");
                this._warningSection = this.findElement("warningSection");
            }
            Object.defineProperty(SummaryView.prototype, "snapshotTileViewModelCollection", {
                get: function () {
                    return this._snapshotTileViewModelCollection;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SummaryView.prototype, "tilesContainer", {
                get: function () {
                    return this._tilesContainer;
                },
                enumerable: true,
                configurable: true
            });
            SummaryView.prototype.initializeToggleBar = function () {
                this._snapshotToggleBar = this.findElement("toggleTabSection");
                var toggle = new Summary.SnapshotHeapTypeToggle(this._model);
                this._snapshotToggleBar.appendChild(toggle.rootElement);
            };
            SummaryView.prototype.onPropertyChanged = function (propertyName) {
                switch (propertyName) {
                    case "warningMessage":
                        this.showWarningMessage(this._model.warningMessage);
                        break;
                }
            };
            SummaryView.prototype.onCollectionChanged = function (eventArgs) {
                switch (eventArgs.action) {
                    case Common.Controls.NotifyCollectionChangedAction.Add:
                        this.createTile(eventArgs.newItems[0]);
                        break;
                    case Common.Controls.NotifyCollectionChangedAction.Reset:
                        this.removeSnapshotTiles();
                        break;
                    case Common.Controls.NotifyCollectionChangedAction.Replace:
                        this.updateTile(eventArgs.newItems[0]);
                        break;
                }
            };
            SummaryView.prototype.updateTile = function (snapshotSummary) {
                for (var i = 0; i < this._snapshotTileViewModelCollection.length; i++) {
                    if (this._snapshotTileViewModelCollection[i].summaryData.id === snapshotSummary.id) {
                        this._snapshotTileViewModelCollection[i].summaryData = snapshotSummary;
                        break;
                    }
                }
            };
            SummaryView.prototype.createTile = function (snapshotSummary) {
                // Create the model and the view
                var model = new Summary.SnapshotTileViewModel(snapshotSummary, this._model.snapshotSummaryCollection);
                var newTile = new Summary.SnapshotTileView(this._controller, model);
                this._model.snapshotSummaryCollection.registerCollectionChanged(newTile);
                this._snapshotTileViewModelCollection.push(model);
                this._tilesContainer.appendChild(newTile.rootElement);
                newTile.rootElement.focus();
            };
            SummaryView.prototype.removeSnapshotTiles = function () {
                while (this._tilesContainer.hasChildNodes()) {
                    this._tilesContainer.removeChild(this._tilesContainer.firstChild);
                }
                this._snapshotTileViewModelCollection = [];
            };
            SummaryView.prototype.toggleProgress = function (show) {
                if (this._snapshotProgress && this._snapshotError) {
                    if (show) {
                        this._snapshotLabel.style.display = "none";
                        this._snapshotIcon.style.display = "none";
                        this._snapshotProgress.style.display = "block";
                        this._snapshotError.style.display = "none";
                    }
                    else {
                        this._snapshotLabel.style.display = "";
                        this._snapshotIcon.style.display = "";
                        this._snapshotProgress.style.display = "none";
                    }
                }
            };
            SummaryView.prototype.showSnapshotError = function (error) {
                if (this._snapshotErrorMsg && this._snapshotError) {
                    if (error) {
                        // Show the message
                        this._snapshotErrorMsg.innerText = Common.ErrorFormatter.format(error);
                        this._snapshotError.style.display = "block";
                    }
                    else {
                        // Hide the message
                        this._snapshotErrorMsg.innerText = "";
                        this._snapshotError.style.display = "none";
                    }
                }
            };
            SummaryView.prototype.showWarningMessage = function (warning) {
                if (!this._warningSection) {
                    return;
                }
                if (warning) {
                    this._warningSection.innerHTML = warning;
                    this._warningSection.style.display = "-ms-grid";
                }
                else {
                    this._warningSection.innerHTML = "";
                    this._warningSection.style.display = "none";
                }
            };
            return SummaryView;
        }(Common.Controls.TemplateControl));
        Summary.SummaryView = SummaryView;
    })(Summary = MemoryProfiler.Summary || (MemoryProfiler.Summary = {}));
})(MemoryProfiler || (MemoryProfiler = {}));
// 
// Copyright (C) Microsoft. All rights reserved.
//
//--------
// External CommonMerged references.  These are included explicitly in the csproj
// as the CommonMerged.d.ts is generated at build-time.
// If we reference them here, TSC 1.8.10 includes the source in the merged JS file
// which is not what we want.
//--------
// <reference path="../../Common/Controls/templateControl.ts" />
//--------
/// <reference path="SummaryView.ts" />
var MemoryProfiler;
(function (MemoryProfiler) {
    var Summary;
    (function (Summary) {
        "use strict";
        (function (SnapshotDisplayType) {
            SnapshotDisplayType[SnapshotDisplayType["managed"] = 0] = "managed";
            SnapshotDisplayType[SnapshotDisplayType["native"] = 1] = "native";
        })(Summary.SnapshotDisplayType || (Summary.SnapshotDisplayType = {}));
        var SnapshotDisplayType = Summary.SnapshotDisplayType;
        var SnapshotHeapTypeToggle = (function (_super) {
            __extends(SnapshotHeapTypeToggle, _super);
            function SnapshotHeapTypeToggle(viewModel) {
                _super.call(this, "SnapshotHeapTypeToggleTemplate");
                this._summaryViewModel = viewModel;
                this._summaryViewModel.registerPropertyChanged(this);
                this._managedHeapButton = this.findElement("snapshotToggleTabManagedButton");
                this._nativeHeapButton = this.findElement("snapshotToggleTabdNativeButton");
                this.findElement("snapshotToggleTabLabel").innerText = Microsoft.Plugin.Resources.getString("SnapshotToggleTabLabel");
                ;
                this._managedHeapButton.innerHTML = Microsoft.Plugin.Resources.getString("SnapshotToggleTabManagedButton");
                this._nativeHeapButton.innerText = Microsoft.Plugin.Resources.getString("SnapshotToggleTabNativeButton");
                this._managedHeapButton.onclick = this.setManagedHeapToggleButtonSelected.bind(this);
                this._nativeHeapButton.onclick = this.setNativeHeapToggleButtonSelected.bind(this);
                var toggleButtons = this.findElementsByClassName("toggleTabButtonContainer");
                for (var buttomIndex = 0; buttomIndex < toggleButtons.length; buttomIndex++) {
                    var buttonElement = toggleButtons[buttomIndex];
                    buttonElement.onkeydown = this.onButtonElementKeyDown.bind(buttonElement);
                }
                this.updateUI();
            }
            SnapshotHeapTypeToggle.prototype.onButtonElementKeyDown = function (e) {
                if ((e.keyCode === MemoryProfiler.Common.KeyCodes.ENTER || e.keyCode === MemoryProfiler.Common.KeyCodes.SPACE) && !e.ctrlKey && !e.altKey && !e.shiftKey) {
                    e.srcElement.click();
                }
            };
            SnapshotHeapTypeToggle.prototype.onPropertyChanged = function (propertyName) {
                switch (propertyName) {
                    case "snapshotDisplayType":
                        this.updateUI();
                        break;
                }
            };
            SnapshotHeapTypeToggle.prototype.updateUI = function () {
                var isManagedSelected = this._summaryViewModel.snapshotDisplayType === SnapshotDisplayType.managed;
                if (isManagedSelected) {
                    this._managedHeapButton.classList.remove("toggleTabButtonContainer");
                    this._managedHeapButton.classList.add("toggleTabButtonContainerSelected");
                    this._managedHeapButton.classList.add("toggleTabSelectedButtonOutline");
                    this._nativeHeapButton.classList.remove("toggleTabSelectedButtonOutline");
                    this._nativeHeapButton.classList.remove("toggleTabButtonContainerSelected");
                    this._nativeHeapButton.classList.add("toggleTabButtonContainer");
                }
                else if (this._summaryViewModel.snapshotDisplayType === SnapshotDisplayType.native) {
                    this._nativeHeapButton.classList.remove("toggleTabButtonContainer");
                    this._nativeHeapButton.classList.add("toggleTabButtonContainerSelected");
                    this._nativeHeapButton.classList.add("toggleTabSelectedButtonOutline");
                    this._managedHeapButton.classList.remove("toggleTabSelectedButtonOutline");
                    this._managedHeapButton.classList.remove("toggleTabButtonContainerSelected");
                    this._managedHeapButton.classList.add("toggleTabButtonContainer");
                }
                this._nativeHeapButton.setAttribute("aria-checked", isManagedSelected ? "false" : "true");
                this._managedHeapButton.setAttribute("aria-checked", isManagedSelected ? "true" : "false");
            };
            SnapshotHeapTypeToggle.prototype.setManagedHeapToggleButtonSelected = function () {
                this._summaryViewModel.snapshotDisplayType = SnapshotDisplayType.managed;
            };
            SnapshotHeapTypeToggle.prototype.setNativeHeapToggleButtonSelected = function () {
                this._summaryViewModel.snapshotDisplayType = SnapshotDisplayType.native;
            };
            return SnapshotHeapTypeToggle;
        }(MemoryProfiler.Common.Controls.TemplateControl));
        Summary.SnapshotHeapTypeToggle = SnapshotHeapTypeToggle;
    })(Summary = MemoryProfiler.Summary || (MemoryProfiler.Summary = {}));
})(MemoryProfiler || (MemoryProfiler = {}));
//
// Copyright (C) Microsoft. All rights reserved.
//
//--------
// External CommonMerged references.  These are included explicitly in the csproj
// as the CommonMerged.d.ts is generated at build-time.
// If we reference them here, TSC 1.8.10 includes the source in the merged JS file
// which is not what we want.
//--------
// <reference path="../../Common/Extensions/Session.ts" />
// <reference path="../../Common/controls/control.ts" />
// <reference path="../../Common/controls/componentModel.ts" />
// <reference path="../../Common/Profiler/MemoryProfilerViewHost.ts" />
//--------
/// <reference path="SummaryView.ts" />
var MemoryProfiler;
(function (MemoryProfiler) {
    var Summary;
    (function (Summary) {
        "use strict";
        var SummaryViewHost = (function (_super) {
            __extends(SummaryViewHost, _super);
            function SummaryViewHost() {
                _super.call(this);
            }
            SummaryViewHost.prototype.initializeView = function (sessionInfo) {
                this.summaryViewController = new Summary.SummaryViewController(sessionInfo);
                document.getElementById('mainContainer').appendChild(this.summaryViewController.view.rootElement);
            };
            return SummaryViewHost;
        }(MemoryProfiler.Common.MemoryProfilerViewHostBase));
        Summary.SummaryViewHost = SummaryViewHost;
        Summary.SummaryViewHostInstance = new SummaryViewHost();
    })(Summary = MemoryProfiler.Summary || (MemoryProfiler.Summary = {}));
})(MemoryProfiler || (MemoryProfiler = {}));
MemoryProfiler.Summary.SummaryViewHostInstance.loadView();
//# sourceMappingURL=SummaryViewMerged.js.map
// SIG // Begin signature block
// SIG // MIIj6wYJKoZIhvcNAQcCoIIj3DCCI9gCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // 4oKNG1RgiPRZBQrOZokB7hz1+YBGHpWduUz+bSNXinig
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
// SIG // NwIBFTAvBgkqhkiG9w0BCQQxIgQgfTTlYqK3Zfy+Ks8e
// SIG // cmifgABoSdwwms61zcf2biOpNOowQgYKKwYBBAGCNwIB
// SIG // DDE0MDKgFIASAE0AaQBjAHIAbwBzAG8AZgB0oRqAGGh0
// SIG // dHA6Ly93d3cubWljcm9zb2Z0LmNvbTANBgkqhkiG9w0B
// SIG // AQEFAASCAQB2L4E3jYiiKR1qg+wR8UWgFf67YiqQiW5U
// SIG // NuHxSi06EHsoGp5IXv/EsZvdXr5O/lTuWADlEutsVsHb
// SIG // WC9KJDlZZKNKn0MkoiMCbMr/hGAoJw9q54AtunTP7ezl
// SIG // vhKC9taRI5KcTNlNcYmiK1Vt4C5HEcqxUmVZJXW7D4hG
// SIG // zmUACgyWCfCTJJ2MNSwErmiWovZpF936tw+Nme6hDcJA
// SIG // gN30XKnHWnBynuxATlv7s6VefZir1T7aS7dmfdh0o3/M
// SIG // UYLC6FiuL7oyOtjF4e2wFLZnAV5Z7gzdIqncMdPX1/Br
// SIG // S9DwvCB1yOnda+cTXzlgS+fKAkC8KydUKLo/2p5bXKGL
// SIG // oYITSjCCE0YGCisGAQQBgjcDAwExghM2MIITMgYJKoZI
// SIG // hvcNAQcCoIITIzCCEx8CAQMxDzANBglghkgBZQMEAgEF
// SIG // ADCCAT0GCyqGSIb3DQEJEAEEoIIBLASCASgwggEkAgEB
// SIG // BgorBgEEAYRZCgMBMDEwDQYJYIZIAWUDBAIBBQAEIEWz
// SIG // UWlfwNWyEe9l7aiVNqoolJIOgbdvQuFQkOdohqlEAgZb
// SIG // KqO2u1QYEzIwMTgwNzA2MjMwMDI0LjYxNFowBwIBAYAC
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
// SIG // MC8GCSqGSIb3DQEJBDEiBCAdFsGbDXcpFucwnM+HOvS0
// SIG // +B9yTKIlvhAf41RVIAx0RDCB4gYLKoZIhvcNAQkQAgwx
// SIG // gdIwgc8wgcwwgbEEFIQVUWUii4Xre1VA0VgDHA3Fcm/A
// SIG // MIGYMIGApH4wfDELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQG
// SIG // A1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIw
// SIG // MTACEzMAAACgGph4PmbYqtcAAAAAAKAwFgQUXx9nHSww
// SIG // gHZoXFqGf3qHf+1zx/gwDQYJKoZIhvcNAQELBQAEggEA
// SIG // kaP1blhojT1gv5aKuMPJ7R0NL2Kj3oHN3tyed1wENThK
// SIG // Dt9TOLYkN5ZzFvpy04ej19P+FET0UrWVepalQ+8UQX+d
// SIG // ehDhUmk6FeJ5rfimL3XLGaUBlmIXI+DAmRxthmB6JWm2
// SIG // HnUQ9UdXrxvo+pIdjrvFxFuYNx1tY6WHbTI5OStRGasq
// SIG // hrkMdaq6xFCnETPDHIMe2d1/KLIokjJr1eEcNCGYbyt/
// SIG // O4K3vKqB0Ls2icFrjvKGHZ0mzKugBzkcCTYwYquI6JTc
// SIG // u/N73gmsPZMOAOxtpcQkuoeisZqCmrMRZsxuz+fgFRvp
// SIG // bhMcDbqC0vA2xJOG7EpiF5F7Rw268UgI/Q==
// SIG // End signature block

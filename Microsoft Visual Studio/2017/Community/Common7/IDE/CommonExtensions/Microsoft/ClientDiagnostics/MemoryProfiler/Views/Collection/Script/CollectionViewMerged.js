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
// <reference path="../../Common/Controls/templateControl.ts" />
// <reference path="../../Common/Util/formattingHelpers.ts" />
// <reference path="../../Common/controls/componentModel.ts" />
// <reference path="../../Common/Profiler/Snapshot.ts" />
//--------
/// <reference path="../../../../../common/script/Hub/plugin.redirect.d.ts" />
var MemoryProfiler;
(function (MemoryProfiler) {
    var Collection;
    (function (Collection) {
        "use strict";
        var SnapshotTileViewModel = (function () {
            function SnapshotTileViewModel(summary) {
                this._summary = summary;
            }
            Object.defineProperty(SnapshotTileViewModel.prototype, "summaryData", {
                get: function () {
                    return this._summary;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SnapshotTileViewModel.prototype, "timeTaken", {
                get: function () {
                    var date = new Date(this._summary.timestamp);
                    return "(" + date.toLocaleTimeString() + ")";
                },
                enumerable: true,
                configurable: true
            });
            return SnapshotTileViewModel;
        }());
        Collection.SnapshotTileViewModel = SnapshotTileViewModel;
        var SnapshotTileView = (function (_super) {
            __extends(SnapshotTileView, _super);
            function SnapshotTileView(model) {
                _super.call(this, "SnapshotTileTemplate");
                this._model = model;
                this._snapshotTile = this.findElement("snapshotTile");
                this._tileHeader = this.findElement("snapshotTileHeader");
                this._screenshotNotAvailableMessage = this.findElement("screenshotNotAvailableMessage");
                this.findElement("snapshotTileTitle").innerText = Microsoft.Plugin.Resources.getString("SnapshotNumber", this._model.summaryData.id);
                if (this._model.summaryData.screenshotFile) {
                    var imgHolder = this.findElement("snapshotTileImage");
                    imgHolder.src = this._model.summaryData.screenshotFile;
                    this._screenshotNotAvailableMessage.style.display = "none";
                }
                this.findElement("snapshotTakenDate").innerText = this._model.timeTaken;
                this.findElement("stopToSeeSnapshotDetails").innerText = Microsoft.Plugin.Resources.getString("StopToSeeSnapshotMessage");
                this._screenshotNotAvailableMessage.innerText = Microsoft.Plugin.Resources.getString("ScreenshotNotAvailable");
            }
            return SnapshotTileView;
        }(MemoryProfiler.Common.Controls.TemplateControl));
        Collection.SnapshotTileView = SnapshotTileView;
    })(Collection = MemoryProfiler.Collection || (MemoryProfiler.Collection = {}));
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
// <reference path="../../../../../common/script/util/notifications.ts" />
// <reference path="../../common/controls/componentModel.ts" />
// <reference path="../../common/controls/templateControl.ts" />
// <reference path="../../common/util/EnumHelper.ts" />
// <reference path="../../common/Profiler/MemoryNotifications.ts" />
// <reference path="../../common/util/errorFormatter.ts" />
// <reference path="../../common/Profiler/MemoryProfilerViewHost.ts" />
// <reference path="../../common/Profiler/SnapshotEngine.ts" />
// <reference path="../../common/Profiler/ClrSnapshotAgent.ts" />
// <reference path="../../common/Profiler/ScreenshotSnapshotAgent.ts" />
// <reference path="../../common/Profiler/FeedbackConstants.ts" />
//--------
/// <reference path="../../../../../common/script/Hub/Plugin.redirect.d.ts" />
/// <reference path="../../../../../common/script/Hub/DiagnosticsHub.redirect.d.ts" />
/// <reference path="CollectionAgentTask.ts" />
/// <reference path="snapshotTileView.ts" />
var MemoryProfiler;
(function (MemoryProfiler) {
    var Collection;
    (function (Collection) {
        "use strict";
        var CollectionViewController = (function () {
            function CollectionViewController(initializeView) {
                var _this = this;
                if (initializeView === void 0) { initializeView = true; }
                this._screenshotHeight = 150;
                this._screenshotKeepAspectRatio = true;
                this._screenshotWidth = 200;
                this._agentGuid = "2E8E6F4B-6107-4F46-8BEA-A920EA880452"; // This is the guid of MemoryProfilerCollectionAgent
                this._activeCollectionAgentTasks = [];
                this.model = new CollectionViewModel();
                if (initializeView) {
                    this.view = new CollectionView(this, this.model);
                }
                this._takeSnapshotTask = new Collection.TakeSnapshotTask(this);
                this._forceGcTask = new Collection.ForceGcCollectionAgentTask(this);
                MemoryProfiler.Common.MemoryProfilerViewHost.session.getSessionInfo().then(function (info) {
                    _this._agentGuid = info.agentGuid;
                    _this._standardCollector = Microsoft.VisualStudio.DiagnosticsHub.Collectors.getStandardTransportService();
                    if (_this._standardCollector) {
                        _this._standardCollector.addMessageListener(new Microsoft.VisualStudio.DiagnosticsHub.Guid(_this._agentGuid), _this.onMessageReceived.bind(_this));
                    }
                });
            }
            Object.defineProperty(CollectionViewController.prototype, "isCollectionAgentTaskActive", {
                get: function () {
                    return this._activeCollectionAgentTasks.length > 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CollectionViewController.prototype, "managedDataSeen", {
                get: function () {
                    return this._managedDataSeen;
                },
                set: function (v) {
                    this._managedDataSeen = v;
                },
                enumerable: true,
                configurable: true
            });
            CollectionViewController.prototype.takeSnapshot = function () {
                this._activeCollectionAgentTasks.push(this._takeSnapshotTask);
                return this._takeSnapshotTask.start();
            };
            CollectionViewController.prototype.forceGarbageCollection = function () {
                this._activeCollectionAgentTasks.push(this._forceGcTask);
                return this._forceGcTask.start();
            };
            CollectionViewController.prototype.setScreenshotSize = function (targetWidth, targetHeight, keepAspectRatio) {
                // Set the size of all future screenshots that are taken of the application
                this._screenshotWidth = targetWidth;
                this._screenshotHeight = targetHeight;
                this._screenshotKeepAspectRatio = keepAspectRatio;
            };
            CollectionViewController.prototype.reset = function () {
                CollectionViewController._nextIdentifier = 1;
                this.model.snapshotSummaryCollection.clear();
                MemoryProfiler.Common.MemoryProfilerViewHost.onIdle();
            };
            CollectionViewController.prototype.sendStringToCollectionAgent = function (request) {
                return this._standardCollector.sendStringToCollectionAgent(this._agentGuid, request);
            };
            CollectionViewController.prototype.downloadFile = function (targetFilePath, localFilePath) {
                var transportService = Microsoft.VisualStudio.DiagnosticsHub.Collectors.getStandardTransportService();
                return transportService.downloadFile(targetFilePath, localFilePath);
            };
            CollectionViewController.prototype.getSnapshotSummary = function (snapshotId) {
                var foundSnapshotSummary = null;
                for (var i = 0; i < this.model.snapshotSummaryCollection.length; i++) {
                    var snapshotSummary = this.model.snapshotSummaryCollection.getItem(i);
                    if (snapshotSummary.id === snapshotId) {
                        foundSnapshotSummary = snapshotSummary;
                        break;
                    }
                }
                return foundSnapshotSummary;
            };
            CollectionViewController.prototype.onMessageReceived = function (message) {
                if (message) {
                    var obj = JSON.parse(message);
                    if (obj) {
                        if (obj.eventName) {
                            switch (obj.eventName) {
                                case "notifyManagedPresent":
                                    this.managedDataSeen = true;
                                    MemoryProfiler.Common.MemoryProfilerViewHost.session.getSessionInfo().then(function (info) {
                                        if (info.targetRuntime === MemoryProfiler.Common.Extensions.TargetRuntime.managed || info.targetRuntime === MemoryProfiler.Common.Extensions.TargetRuntime.mixed) {
                                            Collection.CollectionViewHost.CommandChain.onTargetIsManaged();
                                        }
                                    });
                                    break;
                                default:
                                    break;
                            }
                        }
                        else if (obj.cmd) {
                            switch (obj.cmd) {
                                case "log":
                                    MemoryProfiler.Common.MemoryProfilerViewHost.logMessage(obj.msg);
                                    break;
                                default:
                                    MemoryProfiler.Common.MemoryProfilerViewHost.logMessage("Unexpected Command from agent: " + message);
                                    break;
                            }
                            return; // Commands are not passed on to active tasks - eventName messages (and everything else) are.
                        }
                    }
                }
                for (var i = this._activeCollectionAgentTasks.length - 1; i >= 0; i--) {
                    if (this._activeCollectionAgentTasks[i].isCompleted(message)) {
                        this._activeCollectionAgentTasks.splice(i, 1);
                    }
                }
            };
            CollectionViewController.prototype.sendMessage = function (message) {
                this._standardCollector.sendStringToCollectionAgent(this._agentGuid, message).done(function (response) {
                    if (response && response.length > 0) {
                        var obj = JSON.parse(response);
                        if (!obj.succeeded) {
                            throw new Error(obj.errorMessage);
                        }
                    }
                });
            };
            CollectionViewController._snapshotChunkSize = 32768;
            CollectionViewController._nextIdentifier = 1;
            return CollectionViewController;
        }());
        Collection.CollectionViewController = CollectionViewController;
        var CollectionViewModel = (function (_super) {
            __extends(CollectionViewModel, _super);
            function CollectionViewModel() {
                _super.call(this);
                this._warningMessage = "";
                this._latestSnapshotError = null;
                this._isTakingSnapshot = false;
                this._isForcingGarbageCollection = false;
                this._snapshotSummaryCollection = new MemoryProfiler.Common.Controls.ObservableCollection();
            }
            Object.defineProperty(CollectionViewModel.prototype, "snapshotSummaryCollection", {
                get: function () { return this._snapshotSummaryCollection; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CollectionViewModel.prototype, "warningMessage", {
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
            Object.defineProperty(CollectionViewModel.prototype, "latestSnapshotError", {
                get: function () { return this._latestSnapshotError; },
                set: function (v) {
                    if (this._latestSnapshotError !== v) {
                        this._latestSnapshotError = v;
                        this.raisePropertyChanged("latestSnapshotError");
                        // Create the WER
                        MemoryProfiler.Common.MemoryProfilerViewHost.reportError(v, "SnapshotCapturingFailure");
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CollectionViewModel.prototype, "isTakingSnapshot", {
                get: function () { return this._isTakingSnapshot; },
                set: function (v) {
                    if (this._isTakingSnapshot !== v) {
                        this._isTakingSnapshot = v;
                        this.raisePropertyChanged("isTakingSnapshot");
                        this.raisePropertyChanged("isViewBusy");
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CollectionViewModel.prototype, "isForcingGarbageCollection", {
                get: function () { return this._isForcingGarbageCollection; },
                set: function (v) {
                    if (this._isForcingGarbageCollection !== v) {
                        this._isForcingGarbageCollection = v;
                        this.raisePropertyChanged("isForcingGarbageCollection");
                        this.raisePropertyChanged("isViewBusy");
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CollectionViewModel.prototype, "isViewBusy", {
                get: function () { return this._isForcingGarbageCollection || this._isTakingSnapshot; },
                enumerable: true,
                configurable: true
            });
            return CollectionViewModel;
        }(MemoryProfiler.Common.Controls.ObservableViewModel));
        Collection.CollectionViewModel = CollectionViewModel;
        var CollectionView = (function (_super) {
            __extends(CollectionView, _super);
            function CollectionView(controller, model) {
                _super.call(this, "CollectionViewTemplate");
                this._screenshotWidth = 280;
                this._screenshotHeight = 160;
                this._screenshotKeepAspectRatio = true;
                this._controller = controller;
                this._model = model;
                this.rootElement.classList.add("collectionViewRoot");
                this._model.registerPropertyChanged(this);
                this._model.snapshotSummaryCollection.registerCollectionChanged(this);
                this._snapshotTileViewModelCollection = [];
                this._tilesContainer = this.findElement("tilesContainer");
                this._warningSection = this.findElement("warningSection");
                this._onSnapshotClickHandler = this.onSnapshotClick.bind(this);
                this._takeSnapshotTile = this.findElement("takeSnapshotTile");
                this._snapshotError = this.findElement("snapshotError");
                this._snapshotErrorMsg = this.findElement("snapshotErrorMsg");
                this._snapshotProgress = this.findElement("takeSnapshotProgress");
                this._snapshotButton = this.findElement("takeSnapshotButton");
                this._snapshotLabel = this.findElement("takeSnapshotLabel");
                this._snapshotIcon = this.findElement("takeSnapshotIcon");
                this._snapshotLabel.innerText = Microsoft.Plugin.Resources.getString("TakeSnapshot");
                this._snapshotProgress.innerText = Microsoft.Plugin.Resources.getString("Loading");
                this.toggleProgress(this._model.isViewBusy);
                this.updateTakeSnapshotButton();
                this._snapshotButton.addEventListener("click", this._onSnapshotClickHandler);
                this._controller.setScreenshotSize(this._screenshotWidth, this._screenshotHeight, this._screenshotKeepAspectRatio);
                Microsoft.Plugin.Theme.processInjectedSvg(this.rootElement);
            }
            Object.defineProperty(CollectionView.prototype, "snapshotTileViewModelCollection", {
                get: function () {
                    return this._snapshotTileViewModelCollection;
                },
                enumerable: true,
                configurable: true
            });
            CollectionView.prototype.onPropertyChanged = function (propertyName) {
                switch (propertyName) {
                    case "warningMessage":
                        this.showWarningMessage(this._model.warningMessage);
                        break;
                    case "latestSnapshotError":
                        this.showSnapshotError(this._model.latestSnapshotError);
                        break;
                    case "isTakingSnapshot":
                        this.toggleProgress(this._model.isViewBusy);
                        this.updateTakeSnapshotButton();
                        break;
                    case "isForcingGarbageCollection":
                        this.updateTakeSnapshotButton();
                        break;
                }
            };
            CollectionView.prototype.onCollectionChanged = function (eventArgs) {
                switch (eventArgs.action) {
                    case MemoryProfiler.Common.Controls.NotifyCollectionChangedAction.Add:
                        this.createTile(eventArgs.newItems[0]);
                        break;
                    case MemoryProfiler.Common.Controls.NotifyCollectionChangedAction.Reset:
                        this.removeSnapshotTiles();
                        break;
                }
            };
            CollectionView.prototype.createTile = function (snapshotSummary) {
                // Create the model and the view
                var model = new Collection.SnapshotTileViewModel(snapshotSummary);
                var newTile = new Collection.SnapshotTileView(model);
                this._snapshotTileViewModelCollection.push(model);
                this._tilesContainer.insertBefore(newTile.rootElement, this._takeSnapshotTile);
                newTile.rootElement.focus();
            };
            CollectionView.prototype.removeSnapshotTiles = function () {
                while (this._tilesContainer.hasChildNodes()) {
                    this._tilesContainer.removeChild(this._tilesContainer.firstChild);
                }
                this._tilesContainer.appendChild(this._takeSnapshotTile);
                this._snapshotTileViewModelCollection = [];
            };
            CollectionView.prototype.toggleProgress = function (show) {
                if (this._snapshotProgress && this._snapshotError) {
                    if (show) {
                        this._snapshotLabel.style.display = "none";
                        this._snapshotIcon.style.display = "none";
                        this._snapshotProgress.style.display = "block";
                        this._snapshotError.style.display = "none";
                        this._snapshotButton.setAttribute("aria-label", Microsoft.Plugin.Resources.getString("Loading"));
                    }
                    else {
                        this._snapshotLabel.style.display = "";
                        this._snapshotIcon.style.display = "";
                        this._snapshotProgress.style.display = "none";
                        this._snapshotButton.setAttribute("aria-label", Microsoft.Plugin.Resources.getString("TakeSnapshot"));
                    }
                }
            };
            CollectionView.prototype.showSnapshotError = function (error) {
                if (this._snapshotErrorMsg && this._snapshotError) {
                    if (error) {
                        // Show the message
                        this._snapshotErrorMsg.innerText = MemoryProfiler.Common.ErrorFormatter.format(error);
                        this._snapshotError.style.display = "block";
                    }
                    else {
                        // Hide the message
                        this._snapshotErrorMsg.innerText = "";
                        this._snapshotError.style.display = "none";
                    }
                }
            };
            CollectionView.prototype.showWarningMessage = function (warning) {
                if (!this._warningSection) {
                    return;
                }
                if (warning) {
                    this._warningSection.innerHTML = warning;
                    this._warningSection.style.display = "inline";
                }
                else {
                    this._warningSection.innerHTML = "";
                    this._warningSection.style.display = "none";
                }
            };
            CollectionView.prototype.onSnapshotClick = function (e) {
                this._controller.takeSnapshot();
            };
            CollectionView.prototype.updateTakeSnapshotButton = function () {
                if (this._snapshotButton) {
                    if (!this._model.isViewBusy) {
                        this._snapshotButton.classList.remove("disabled");
                        this._snapshotButton.disabled = false;
                    }
                    else {
                        if (this._model.isForcingGarbageCollection)
                            this._snapshotButton.classList.add("disabled");
                        this._snapshotButton.disabled = true;
                    }
                }
            };
            return CollectionView;
        }(MemoryProfiler.Common.Controls.TemplateControl));
        Collection.CollectionView = CollectionView;
    })(Collection = MemoryProfiler.Collection || (MemoryProfiler.Collection = {}));
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
//--------
/// <reference path="CollectionView.ts" />
var MemoryProfiler;
(function (MemoryProfiler) {
    var Collection;
    (function (Collection) {
        "use strict";
        var TakeSnapshotTask = (function () {
            function TakeSnapshotTask(controller) {
                this._snapshotAgents = [];
                this._controller = controller;
                this._snapshotAgents.push(new MemoryProfiler.Common.ClrSnapshotAgent());
                this._snapshotAgents.push(new MemoryProfiler.Common.ScreenshotSnapshotAgent());
                this._snapshotAgents.push(new MemoryProfiler.Common.NativeSnapshotAgent());
            }
            TakeSnapshotTask.prototype.start = function () {
                var _this = this;
                return new Microsoft.Plugin.Promise(function (completed, error) {
                    if (!_this.takeSnapshotInternal()) {
                        if (error) {
                            error(new Error("Snapshot Not Currently Enabled"));
                        }
                    }
                    else {
                        _this._snapshotCompleted = completed;
                        _this._snapshotError = error;
                    }
                });
            };
            TakeSnapshotTask.prototype.isCompleted = function (message) {
                if (message) {
                    var obj = JSON.parse(message);
                    if (obj.eventName) {
                        if (obj.eventName === "snapshotData") {
                            if (this._controller.model.isViewBusy) {
                                var snapshotData = obj;
                                if (this._activeSnapshot && snapshotData.id == this._activeSnapshot.id) {
                                    this._activeSnapshot.processAgentData(snapshotData.data.agent, snapshotData.data.data);
                                }
                            }
                        }
                    }
                    else {
                        if (this._controller.model.isViewBusy) {
                            if (obj.snapshotResults) {
                                this.onSnapshotResult(obj);
                            }
                            else {
                                var response = obj;
                                this.onSnapshotFailed(new Error(response.errorMessage));
                            }
                            return true;
                        }
                    }
                }
                return false;
            };
            TakeSnapshotTask.prototype.takeSnapshotInternal = function () {
                if (this._controller.model.isViewBusy) {
                    return false;
                }
                MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.TakeSnapshot, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.Common.FeedbackCommandSourceNames.CollectionView);
                MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(MemoryProfiler.Common.CodeMarkerValues.perfMP_TakeSnapshotStart, MemoryProfiler.Common.CodeMarkerValues.perfMP_TakeSnapshotEnd);
                this._controller.model.isTakingSnapshot = true;
                this._activeSnapshot = new MemoryProfiler.Common.SnapshotEngine(Collection.CollectionViewController._nextIdentifier, this._snapshotAgents, this._controller);
                var message = "{ \"commandName\": \"takeSnapshot\", \"snapshotId\": \"" + Collection.CollectionViewController._nextIdentifier + "\", \"agentMask\": \"65535\" }";
                this._controller.sendMessage(message);
                return true;
            };
            TakeSnapshotTask.prototype.onSnapshotResult = function (snapshotResult) {
                var _this = this;
                if (!snapshotResult) {
                    throw new Error("<move to resources>: snapshotAsync ended with no response");
                }
                if (!this._activeSnapshot) {
                    this._controller.model.isTakingSnapshot = false;
                }
                else {
                    this._activeSnapshot.processSnapshotResults(snapshotResult.snapshotResults, function (snapshot) {
                        MemoryProfiler.Common.MemoryProfilerViewHost.session.addSnapshot(snapshot).then(function () {
                            _this.onSnapshotCompleted(_this._activeSnapshot.snapshot);
                        });
                    }, this.onSnapshotFailed);
                }
            };
            TakeSnapshotTask.prototype.onSnapshotCompleted = function (snapshot) {
                if (this._snapshotCompleted) {
                    this._snapshotCompleted(Microsoft.Plugin.Promise.wrap(snapshot));
                }
                this._snapshotCompleted = null;
                this._snapshotError = null;
                if (!snapshot) {
                    throw new Error(Microsoft.Plugin.Resources.getErrorString("MemProf.1014"));
                }
                Collection.CollectionViewController._nextIdentifier++;
                this._controller.model.snapshotSummaryCollection.add(snapshot);
                this._controller.model.isTakingSnapshot = false;
                this._activeSnapshot = null;
                MemoryProfiler.Common.MemoryProfilerViewHost.endCodeMarker(MemoryProfiler.Common.CodeMarkerValues.perfMP_TakeSnapshotStart);
            };
            TakeSnapshotTask.prototype.onSnapshotFailed = function (error) {
                if (!error) {
                    throw new Error(Microsoft.Plugin.Resources.getErrorString("MemProf.1015"));
                }
                error.message = Microsoft.Plugin.Resources.getString("SnapshotCreationFailed", error.message);
                this._controller.model.latestSnapshotError = error;
                this._controller.model.isTakingSnapshot = false;
                this._activeSnapshot = null;
                if (this._snapshotError) {
                    this._snapshotError(error);
                }
                this._snapshotCompleted = null;
                this._snapshotError = null;
                MemoryProfiler.Common.MemoryProfilerViewHost.endCodeMarker(MemoryProfiler.Common.CodeMarkerValues.perfMP_TakeSnapshotStart);
                MemoryProfiler.Common.MemoryProfilerViewHost.onIdle();
            };
            return TakeSnapshotTask;
        }());
        Collection.TakeSnapshotTask = TakeSnapshotTask;
        var ForceGcCollectionAgentTask = (function () {
            function ForceGcCollectionAgentTask(controller) {
                this._controller = controller;
            }
            ForceGcCollectionAgentTask.prototype.start = function () {
                var _this = this;
                MemoryProfiler.Common.MemoryProfilerViewHost.session.logCommandUsage(MemoryProfiler.Common.FeedbackCommandNames.ForceGarbageCollection, MemoryProfiler.Common.FeedbackCommandInvokeMethodNames.Control, MemoryProfiler.Common.FeedbackCommandSourceNames.CollectionView);
                MemoryProfiler.Common.MemoryProfilerViewHost.startCodeMarker(MemoryProfiler.Common.CodeMarkerValues.prefMP_ForceGarbageCollectionStart, MemoryProfiler.Common.CodeMarkerValues.prefMP_ForceGarbageCollectionEnd);
                return new Microsoft.Plugin.Promise(function (completed) {
                    _this._controller.model.isForcingGarbageCollection = true;
                    var message = "{ \"commandName\": \"forceGarbageCollection\"}";
                    _this._controller.sendMessage(message);
                    _this._forceGcCompleted = completed;
                });
            };
            ForceGcCollectionAgentTask.prototype.isCompleted = function (message) {
                var result = false;
                if (message) {
                    var obj = JSON.parse(message);
                    if (obj.eventName && obj.eventName === "forcedGarbageCollectionComplete") {
                        this._controller.model.isForcingGarbageCollection = false;
                        MemoryProfiler.Common.MemoryProfilerViewHost.endCodeMarker(MemoryProfiler.Common.CodeMarkerValues.prefMP_ForceGarbageCollectionStart);
                        result = true;
                    }
                }
                if (this._forceGcCompleted) {
                    this._forceGcCompleted();
                }
                this._forceGcCompleted = null;
                return result;
            };
            return ForceGcCollectionAgentTask;
        }());
        Collection.ForceGcCollectionAgentTask = ForceGcCollectionAgentTask;
    })(Collection = MemoryProfiler.Collection || (MemoryProfiler.Collection = {}));
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
// <reference path="../../Common/controls/componentModel.ts" />
//--------
/// <reference path="../../../../../Common/Script/Hub/plugin.redirect.d.ts" />
/// <reference path="CollectionViewHost.ts" />
var MemoryProfiler;
(function (MemoryProfiler) {
    var Collection;
    (function (Collection) {
        "use strict";
        var CommandBase = (function (_super) {
            __extends(CommandBase, _super);
            function CommandBase(host, commandBinding) {
                _super.call(this, commandBinding);
                this._host = host;
            }
            CommandBase.prototype.setNext = function (nextCommand) {
                this._nextCommand = nextCommand;
            };
            CommandBase.prototype.onCollectionFinishing = function () {
                this.setEnabled(false);
                if (this._nextCommand) {
                    this._nextCommand.onCollectionFinishing();
                }
            };
            CommandBase.prototype.onTargetIsManaged = function () {
                if (this._nextCommand) {
                    this._nextCommand.onTargetIsManaged();
                }
            };
            CommandBase.prototype.onPropertyChanged = function (propertyName) {
                if (propertyName === "isViewBusy") {
                    this.setEnabled(this.shouldEnable());
                }
                if (this._nextCommand) {
                    this._nextCommand.onPropertyChanged(propertyName);
                }
            };
            CommandBase.prototype.onClose = function () {
                this.setEnabled(false);
                if (this._nextCommand) {
                    this._nextCommand.onClose();
                }
            };
            CommandBase.prototype.shouldEnable = function () {
                return !this._host.collectionViewController.model.isViewBusy;
            };
            return CommandBase;
        }(Microsoft.VisualStudio.DiagnosticsHub.ToolbarButton));
        Collection.CommandBase = CommandBase;
        var TakeSnapshotCommand = (function (_super) {
            __extends(TakeSnapshotCommand, _super);
            function TakeSnapshotCommand(host) {
                _super.call(this, host, {
                    callback: function () { return host.collectionViewController.takeSnapshot(); },
                    label: Microsoft.Plugin.Resources.getString("TakeSnapshot"),
                    iconEnabled: "image-snapshot",
                    iconDisabled: "image-snapshot-disabled",
                    disabled: function () { return host.collectionViewController.model.isViewBusy; },
                    displayOnToolbar: true
                });
            }
            return TakeSnapshotCommand;
        }(CommandBase));
        Collection.TakeSnapshotCommand = TakeSnapshotCommand;
        var ForceGcCommand = (function (_super) {
            __extends(ForceGcCommand, _super);
            function ForceGcCommand(host) {
                _super.call(this, host, {
                    callback: function () { return host.collectionViewController.forceGarbageCollection(); },
                    label: Microsoft.Plugin.Resources.getString("ForceGc"),
                    iconEnabled: "image-forceGc",
                    iconDisabled: "image-forceGc-disabled",
                    displayOnToolbar: true
                });
                this.isManaged = false;
                this.setEnabled(false);
                this.container.hidden = true;
            }
            ForceGcCommand.prototype.onTargetIsManaged = function () {
                this.isManaged = true;
                this.setEnabled(this.shouldEnable());
                _super.prototype.onTargetIsManaged.call(this);
            };
            ForceGcCommand.prototype.shouldEnable = function () {
                return this.isManaged && _super.prototype.shouldEnable.call(this);
            };
            return ForceGcCommand;
        }(CommandBase));
        Collection.ForceGcCommand = ForceGcCommand;
    })(Collection = MemoryProfiler.Collection || (MemoryProfiler.Collection = {}));
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
/// <reference path="../../../../../common/script/Hub/Plugin.redirect.d.ts" />
/// <reference path="../../../../../common/script/Hub/DiagnosticsHub.redirect.d.ts" />
/// <reference path="CollectionView.ts" />
/// <reference path="VsPluginCommandHelper.ts" />
var MemoryProfiler;
(function (MemoryProfiler) {
    var Collection;
    (function (Collection) {
        "use strict";
        var CollectionViewHost = (function (_super) {
            __extends(CollectionViewHost, _super);
            function CollectionViewHost() {
                _super.call(this);
            }
            CollectionViewHost.prototype.sessionStateChanged = function (eventArgs) {
                var currentState = eventArgs.currentState;
                switch (currentState) {
                    case 400 /* CollectionFinishing */:
                        CollectionViewHost.CommandChain.onCollectionFinishing();
                        break;
                    case 500 /* CollectionFinished */:
                        Microsoft.VisualStudio.DiagnosticsHub.getCurrentSession().removeStateChangedEventListener(this.sessionStateChanged);
                        // Have session persist our session metadata now
                        var eventCompleteDeferral = eventArgs.getDeferral();
                        var onSaveCompleted = function (success) {
                            eventCompleteDeferral.complete();
                        };
                        this.session.save(this.collectionViewController.managedDataSeen === true).done(onSaveCompleted);
                        break;
                }
            };
            CollectionViewHost.prototype.onPropertyChanged = function (propertyName) {
                CollectionViewHost.CommandChain.onPropertyChanged(propertyName);
            };
            CollectionViewHost.prototype.initializeView = function (sessionInfo) {
                this.collectionViewController = new Collection.CollectionViewController();
                document.getElementById('mainContainer').appendChild(this.collectionViewController.view.rootElement);
                this.collectionViewController.model.registerPropertyChanged(this);
                Microsoft.VisualStudio.DiagnosticsHub.getCurrentSession().addStateChangedEventListener(this.sessionStateChanged.bind(this));
                Microsoft.Plugin.addEventListener("close", function () {
                    CollectionViewHost.CommandChain.onClose();
                });
                this.initCommands();
            };
            CollectionViewHost.prototype.initCommands = function () {
                if (Microsoft.Plugin.VS && Microsoft.Plugin.VS.Commands) {
                    var takeSnapshotCommand = new Collection.TakeSnapshotCommand(this);
                    var forceGcCommand = new Collection.ForceGcCommand(this);
                    takeSnapshotCommand.setNext(forceGcCommand);
                    CollectionViewHost.CommandChain = takeSnapshotCommand;
                    var toolbarSection = document.getElementsByClassName('toolbarSection')[0];
                    var toolbar = new Microsoft.VisualStudio.DiagnosticsHub.Toolbar();
                    toolbar.addToolbarItem(takeSnapshotCommand);
                    toolbar.addToolbarItem(forceGcCommand);
                    toolbarSection.appendChild(toolbar.container);
                }
            };
            return CollectionViewHost;
        }(MemoryProfiler.Common.MemoryProfilerViewHostBase));
        Collection.CollectionViewHost = CollectionViewHost;
        Collection.CollectionViewHostInstance = new CollectionViewHost();
    })(Collection = MemoryProfiler.Collection || (MemoryProfiler.Collection = {}));
})(MemoryProfiler || (MemoryProfiler = {}));
MemoryProfiler.Collection.CollectionViewHostInstance.loadView();
//# sourceMappingURL=CollectionViewMerged.js.map
// SIG // Begin signature block
// SIG // MIIj6wYJKoZIhvcNAQcCoIIj3DCCI9gCAQExDzANBglg
// SIG // hkgBZQMEAgEFADB3BgorBgEEAYI3AgEEoGkwZzAyBgor
// SIG // BgEEAYI3AgEeMCQCAQEEEBDgyQbOONQRoqMAEEvTUJAC
// SIG // AQACAQACAQACAQACAQAwMTANBglghkgBZQMEAgEFAAQg
// SIG // r1JqyCsZvF1S1NAQ3FeDFIhiaGOaUNnrZh1//wLqu4yg
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
// SIG // NwIBFTAvBgkqhkiG9w0BCQQxIgQgWzdvQMdiEuASAvVW
// SIG // 70BiBRghdpfDpYavv+AmGGk2mIIwQgYKKwYBBAGCNwIB
// SIG // DDE0MDKgFIASAE0AaQBjAHIAbwBzAG8AZgB0oRqAGGh0
// SIG // dHA6Ly93d3cubWljcm9zb2Z0LmNvbTANBgkqhkiG9w0B
// SIG // AQEFAASCAQAu6r6rKe5q7OT5Bf5fm4ejH6rtFlxb0+6X
// SIG // 84nK3+vW19LMDx1u8CQvAtBF0Om/hDuCm92cF4TEVBGM
// SIG // iP+cOXmO5wm5grB0BV1JKhavUTnFBbH7J2xmkxFbiTkT
// SIG // /GF6E7xN6DsI56A4e1Pwds8ukt34PNCDykXPCVLXICWH
// SIG // POB0teaj/AGOg6gVMOONFnpN2NoZLBhJ02JF8Q9teN79
// SIG // 1bi9RW7jXguk86hZn39O6YgTX8z6hRGK10voiDYJuxik
// SIG // 6n55VEfJGFIZD6pXc451fL8AiGUBhJHU5jLDhJEl6rZ7
// SIG // AX8VeMKO6etJLwAnqQWzlPOEPaFFd6vhacCMMeAlq0gv
// SIG // oYITSjCCE0YGCisGAQQBgjcDAwExghM2MIITMgYJKoZI
// SIG // hvcNAQcCoIITIzCCEx8CAQMxDzANBglghkgBZQMEAgEF
// SIG // ADCCAT0GCyqGSIb3DQEJEAEEoIIBLASCASgwggEkAgEB
// SIG // BgorBgEEAYRZCgMBMDEwDQYJYIZIAWUDBAIBBQAEIA6H
// SIG // vdPLOvgHHus0ppFs/jJR5jxkhsn1SNYA3M2NshoFAgZb
// SIG // Kpu9cB0YEzIwMTgwNzA2MjMwMDM5LjA0OVowBwIBAYAC
// SIG // AfSggbmkgbYwgbMxCzAJBgNVBAYTAlVTMRMwEQYDVQQI
// SIG // EwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4w
// SIG // HAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xDTAL
// SIG // BgNVBAsTBE1PUFIxJzAlBgNVBAsTHm5DaXBoZXIgRFNF
// SIG // IEVTTjpDMEY0LTMwODYtREVGODElMCMGA1UEAxMcTWlj
// SIG // cm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZaCCDs0wggTa
// SIG // MIIDwqADAgECAhMzAAAAo+8fIiCBY9ylAAAAAACjMA0G
// SIG // CSqGSIb3DQEBCwUAMHwxCzAJBgNVBAYTAlVTMRMwEQYD
// SIG // VQQIEwpXYXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25k
// SIG // MR4wHAYDVQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24x
// SIG // JjAkBgNVBAMTHU1pY3Jvc29mdCBUaW1lLVN0YW1wIFBD
// SIG // QSAyMDEwMB4XDTE2MDkwNzE3NTY0OVoXDTE4MDkwNzE3
// SIG // NTY0OVowgbMxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpX
// SIG // YXNoaW5ndG9uMRAwDgYDVQQHEwdSZWRtb25kMR4wHAYD
// SIG // VQQKExVNaWNyb3NvZnQgQ29ycG9yYXRpb24xDTALBgNV
// SIG // BAsTBE1PUFIxJzAlBgNVBAsTHm5DaXBoZXIgRFNFIEVT
// SIG // TjpDMEY0LTMwODYtREVGODElMCMGA1UEAxMcTWljcm9z
// SIG // b2Z0IFRpbWUtU3RhbXAgU2VydmljZTCCASIwDQYJKoZI
// SIG // hvcNAQEBBQADggEPADCCAQoCggEBAKnRHpfHE2n4ODsV
// SIG // F+ZIDvlfgqxUnTAarRBd0PIF9z9ohjda0ABT5pxtHGjy
// SIG // KcfW/zGYUk0RuvXBZIY6OQknVklen6EhGSkbzFoW4/N9
// SIG // AVUXLOnhrJb7x5mvKHAAdSL6LnKUVF+60cWsMtTl1h55
// SIG // 8IGjCr5jvnhpZ+KPhdHJvsh/kIvkuH6Yrm++KmQIGki3
// SIG // OSHIavQkS2AQ1HKAcgg46W75O1PtWdsk1E1hyFvTaWMA
// SIG // Mr3MsVE960C4f7i+u3IdwThs3gmObi2ZOmxFCN6zT1tt
// SIG // bYCR2SObSJlMHuURf7MXnnaRveImFh8RABw635noLP/s
// SIG // dSxYKXCnFy0o7o+0o18CAwEAAaOCARswggEXMB0GA1Ud
// SIG // DgQWBBT6hbpmZuhGmdpwn7ohJUDb4OixcDAfBgNVHSME
// SIG // GDAWgBTVYzpcijGQ80N7fEYbxTNoWoVtVTBWBgNVHR8E
// SIG // TzBNMEugSaBHhkVodHRwOi8vY3JsLm1pY3Jvc29mdC5j
// SIG // b20vcGtpL2NybC9wcm9kdWN0cy9NaWNUaW1TdGFQQ0Ff
// SIG // MjAxMC0wNy0wMS5jcmwwWgYIKwYBBQUHAQEETjBMMEoG
// SIG // CCsGAQUFBzAChj5odHRwOi8vd3d3Lm1pY3Jvc29mdC5j
// SIG // b20vcGtpL2NlcnRzL01pY1RpbVN0YVBDQV8yMDEwLTA3
// SIG // LTAxLmNydDAMBgNVHRMBAf8EAjAAMBMGA1UdJQQMMAoG
// SIG // CCsGAQUFBwMIMA0GCSqGSIb3DQEBCwUAA4IBAQAd0UW6
// SIG // W7S/iuaGjUXONYgmEkawM4NqYTHIFnP45iR6asHAFTc8
// SIG // jccpDUjLdJelsofhBnjVQ4xTOvDiUQ54ttP8HI0l5VMa
// SIG // Fdk+erzHu8FOZlhRGA9lJWEhob7mkcNgjvkJtD6IwqZy
// SIG // gTsc8hAc1QWuiF00VVKoQ4aM8A1UvkvkS+4XlbabvAJr
// SIG // Fs2yLWz1q9814QaDtFlB5x4B82hN99jeJCxGS0LAjRdz
// SIG // RFArjd52zX90Xd/mZMwyuJ7Az2VSEQgGepe2g2WjYtjD
// SIG // g7o5jke4U6rDZhocvUlO9NzUB6zSuNFk+eB3yex2gMSr
// SIG // FyvrI4O1lonx2EuWkt1vqcI71vOcMIIGcTCCBFmgAwIB
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
// SIG // RFNFIEVTTjpDMEY0LTMwODYtREVGODElMCMGA1UEAxMc
// SIG // TWljcm9zb2Z0IFRpbWUtU3RhbXAgU2VydmljZaIlCgEB
// SIG // MAkGBSsOAwIaBQADFQA15KP7Tj//Jg1x9W1eEnuRljim
// SIG // jaCBwjCBv6SBvDCBuTELMAkGA1UEBhMCVVMxEzARBgNV
// SIG // BAgTCldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQx
// SIG // HjAcBgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEN
// SIG // MAsGA1UECxMETU9QUjEnMCUGA1UECxMebkNpcGhlciBO
// SIG // VFMgRVNOOjU3RjYtQzFFMC01NTRDMSswKQYDVQQDEyJN
// SIG // aWNyb3NvZnQgVGltZSBTb3VyY2UgTWFzdGVyIENsb2Nr
// SIG // MA0GCSqGSIb3DQEBBQUAAgUA3unSeTAiGA8yMDE4MDcw
// SIG // NjE5MzUyMVoYDzIwMTgwNzA3MTkzNTIxWjB0MDoGCisG
// SIG // AQQBhFkKBAExLDAqMAoCBQDe6dJ5AgEAMAcCAQACAhqu
// SIG // MAcCAQACAhriMAoCBQDe6yP5AgEAMDYGCisGAQQBhFkK
// SIG // BAIxKDAmMAwGCisGAQQBhFkKAwGgCjAIAgEAAgMW42Ch
// SIG // CjAIAgEAAgMHoSAwDQYJKoZIhvcNAQEFBQADggEBAI1N
// SIG // ct79PqrCE6KaipndZhkJJXGOlnPDrTcljhB6I6J1Pw3h
// SIG // +h41jsFGqmpO0cQ9iZtwXstg4WEzWE2EoQ/jwSmzQgAT
// SIG // ad2m+XGc3oW1rPIc66+izhiWfHTYznSDWaZ7fhVW87pr
// SIG // Ger4R0+XQ6O9U6QpLpZoWgqT3JUkG+rmG5X+Gt80VLW4
// SIG // l2i3uh64MDF5bblUsKtUjHhmcJuDjO0jJFoT5ucO4bKc
// SIG // 9ITkpqYJtQdtmX41ssn5OFDu7125v2bWk0pL1DeGewCz
// SIG // cPJPamy/FAD9OZ5+cbHPQL+UL/PTTZFliISSyK+0icGT
// SIG // xWSblnoP7Xnbsz/FEqDSSbCRvmm5PIAxggL1MIIC8QIB
// SIG // ATCBkzB8MQswCQYDVQQGEwJVUzETMBEGA1UECBMKV2Fz
// SIG // aGluZ3RvbjEQMA4GA1UEBxMHUmVkbW9uZDEeMBwGA1UE
// SIG // ChMVTWljcm9zb2Z0IENvcnBvcmF0aW9uMSYwJAYDVQQD
// SIG // Ex1NaWNyb3NvZnQgVGltZS1TdGFtcCBQQ0EgMjAxMAIT
// SIG // MwAAAKPvHyIggWPcpQAAAAAAozANBglghkgBZQMEAgEF
// SIG // AKCCATIwGgYJKoZIhvcNAQkDMQ0GCyqGSIb3DQEJEAEE
// SIG // MC8GCSqGSIb3DQEJBDEiBCCm/GUCHUgMR82Xo5GpUnOL
// SIG // 3S00IAFTdXkJ/W2GRFsq8DCB4gYLKoZIhvcNAQkQAgwx
// SIG // gdIwgc8wgcwwgbEEFDXko/tOP/8mDXH1bV4Se5GWOKaN
// SIG // MIGYMIGApH4wfDELMAkGA1UEBhMCVVMxEzARBgNVBAgT
// SIG // Cldhc2hpbmd0b24xEDAOBgNVBAcTB1JlZG1vbmQxHjAc
// SIG // BgNVBAoTFU1pY3Jvc29mdCBDb3Jwb3JhdGlvbjEmMCQG
// SIG // A1UEAxMdTWljcm9zb2Z0IFRpbWUtU3RhbXAgUENBIDIw
// SIG // MTACEzMAAACj7x8iIIFj3KUAAAAAAKMwFgQUh56qHWH7
// SIG // 5foaXVpg/iioTtEtz2YwDQYJKoZIhvcNAQELBQAEggEA
// SIG // Y3NP3KDUfB6nuhN8jbU3DTdf2PDl5iBEZuWsj3wrtxv9
// SIG // HsiKm2TVDxcBjWjG0UAgxIfDsq6Dsb1pRzqC7O40ZOlB
// SIG // 7rbO1mS2Kk78lDFl6YgSRFh7qfvNktrv/+jlHEtl9F4o
// SIG // WLNXtB+FIHMWMNWzYUy+grQ7Sm16Rd2O44Pq/te/YiMF
// SIG // rnNNFwiwr+w1W5C+BrNWd6dHlk0oDXIvOSi+L2/n3Y+H
// SIG // N2ECRPXLgWktkFe8QlXas8LhxgDOlk5OOBkKENTfl8qg
// SIG // X8SDeDa2PCGX5hFRMZYvKREmV7oxtBpi28NcHSx95lWg
// SIG // F8MTL9ZaJ/aS1PGKghrc86fagoIpuPDmdg==
// SIG // End signature block

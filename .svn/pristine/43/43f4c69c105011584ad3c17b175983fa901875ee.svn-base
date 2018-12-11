

function setState(newState) {
    var currentState = getCurrentState();
    var nextState = Object.assign({}, currentState, newState)
    $('#btnSearch').state(nextState, TMD_STATES.TMD_SEARCH);
}

function getCurrentState() {
    return $('#btnSearch')
        .tmd_getCurrentState(TMD_STATES.TMD_SEARCH);
}

var request = {
    get: function (url, param, callback) {
        return $.get(config.root + url, param)
    },
    post: function (url, param, callback) {
        return $.post(config.root + url, param)
    }
}

var helpers = (function (a) {
    'use strict';
    var activateGISDraw = function (callback) {
        //setTimeout(function () {
        //    callback.call(null, [
        //        { "shape": "POINT(839911.952301895 1915728.3513412657)" , "srid": 24047 },
        //        { "shape": "POINT(202130.19209268823 1915073.0149395973)", "srid": 24048 }
        //    ])
        //}, 3000)
        
        if (gisIframeWindow) {
            // Input
            var toolType = 'polygon',
                clearGraphicWhenComplete = true;

            // Call method
            gisIframeWindow.GIS.activateDraw(toolType, clearGraphicWhenComplete, function (drawEvent) {
                console.log(drawEvent);
                var shape = drawEvent.shape,
                    sridIn = drawEvent.srid,
                    sridOut = [24047, 24048];

                // Call method
                console.log(gisIframeWindow.GIS.transform(shape, sridIn, sridOut));
                var result = gisIframeWindow.GIS.transform(shape, sridIn, sridOut);
                if (typeof callback == 'function') callback.call(null, result);
            })
        }  else { throw new Error('Cannot connect to the GIS') }
    }

    var openFunction = function (toolName) {
        if (gisIframeWindow) {
            console.log('gisIframeWindow.GIS.openFunction("measurement", { toolName: toolName })')
            return function (callback) {
                activateGISDraw(callback)
            };
        } else { throw new Error('Cannot connect to the GIS') }
    }

    return {
        transformPointToShape: function (x, y) {
            var shape = `POINT(${x} ${y})`,
                sridIn = 32647,
                sridOut = [24047, 24048];

            var transRes = gisIframeWindow.GIS.transform(shape, sridIn, sridOut);
            return transRes;

            //return [
            //    { "shape": "POINT(839911.952301895 1915728.3513412657)"  , "srid": 24047 },
            //    { "shape": "POINT(202130.19209268823 1915073.0149395973)", "srid": 24048 }
            //];
        },

        activateGISDrawTool: function (toolName, callback) {
            openFunction(toolName)(callback);
        }
    }

})(jQuery)


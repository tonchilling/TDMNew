

function fetchApiPOIsData() {
    
    return new Promise(function (resolve, reject) {
        var currentState = getCurrentState();
        var url = `/api/PriceSys/GetPOIs?changwatCode=${currentState.changwatCode}&amphurCode=${currentState.amphurCode}&tumbonCode=${currentState.tumbonCode}`;
        var observable = Rx
            .Observable
            .from(request.get(url));
        observable.subscribe(
            function (result) {
                resolve(result);
            },
            function (err) {
                reject(err);
            }
        );
            
    })
}

function fetchApiResultData() {
    return new Promise(function (resolve, reject) {
        var currentState = getCurrentState(); console.log('call fetchApiResultData: ', currentState);
        var shapes = JSON.stringify(currentState.shapes);
        var branchCodes = JSON.stringify(currentState.branchCodes);
        var url = `/api/PriceSys/GetResultDetail?searchCriteria=${currentState.searchCriteria}&branchCode=${branchCodes}&radius=${currentState.radius}&parcel_type=${currentState.parcelType}&shapes=${shapes}&object_id=${currentState.objectId}&changwatCode=${currentState.changwatCode}&amphurCode=${currentState.amphurCode}&tumbonCode=${currentState.tumbonCode}&x=${currentState.x}&y=${currentState.y}`;
        var observable = Rx
            .Observable
            .from(request.get(url));
        observable.subscribe(
            function (result) {
                resolve(result);
            },
            function (err) {
                reject(err);
            }
        );
    })
}

function fetchApiPOIsListData() {
    return new Promise(function (resolve, reject) {
        var currentState = getCurrentState();
        var shapes = JSON.stringify(currentState.shapes);
        var branchCodes = JSON.stringify(currentState.branchCodes);
        var url = `/api/PriceSys/GetResultsPOIs?radius=${currentState.radius}&branchCode=${branchCodes}&parcel_type=${currentState.parcelType}&shapes=${shapes}&object_id=${currentState.objectId}&changwatCode=${currentState.changwatCode}&amphurCode=${currentState.amphurCode}&tumbonCode=${currentState.tumbonCode}&x=${currentState.x}&y=${currentState.y}`;
        var observable = Rx
            .Observable
            .from(request.get(url));
        observable.subscribe(
            function (result) {
                resolve(result);
            },
            function (err) {
                reject(err);
            }
        );
    })
}

function fetchApiPOIsDetailData() {
    return new Promise(function (resolve, reject) {
        var currentState = getCurrentState();
        var url = `/api/PriceSys/GetPOIDetail?chanod_no=${currentState.chanodNo}&object_id=${currentState.objectId}&radius=${currentState.radius}&parcel_type=${currentState.parcelType}&changwatCode=${currentState.changwatCode}`;
        var observable = Rx
            .Observable
            .from(request.get(url));
        observable.subscribe(
            function (result) {
                resolve(result);
            },
            function (err) {
                reject(err);
            }
        );
    })
}

function fetchApiPOIsDetailDataCondominiums() {
    return new Promise(function (resolve, reject) {
        var currentState = getCurrentState();
        var url = `/api/PriceSys/GetPOIDetailCondominiums?chanod_no=${currentState.chanodNo}&object_id=${currentState.objectId}&radius=${currentState.radius}&parcel_type=${currentState.parcelType}&changwatCode=${currentState.changwatCode}`;
        var observable = Rx
            .Observable
            .from(request.get(url));
        observable.subscribe(
            function (result) {
                resolve(result);
            },
            function (err) {
                reject(err);
            }
        );
    })
}

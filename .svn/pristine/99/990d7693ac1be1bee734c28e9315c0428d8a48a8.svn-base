
function fetchData(callback) {
    var promisePOIs = fetchApiPOIsData();
    var obsvPromise = Rx.Observable.fromPromise(promisePOIs);
    obsvPromise.subscribe(
        function (result) {
            setState({ isFetchingData: false, data: result, error: false })
            if (typeof callback === 'function') callback(getCurrentState());
        },
        function (err) {
            setState({ isFetchingData: false, error: true, data: [] })
            if (typeof callback === 'function') callback(getCurrentState());
            console.error(err);
        }
    )
}

function fetchResultData(callback) {
    var promisePOIs = fetchApiResultData();
    var obsvPromise = Rx.Observable.fromPromise(promisePOIs);
    obsvPromise.subscribe(
        function (result) {
            setState({ isFetchingData: false, data: result, error: false })
            if (typeof callback === 'function') callback(getCurrentState());
        },
        function (err) {
            setState({ isFetchingData: false, error: true, data: [] })
            if (typeof callback === 'function') callback(getCurrentState());
            console.error(err);
        }
    )
}

function fetchPOIsListData(callback) {
    var promisePOIs = fetchApiPOIsListData();
    var obsvPromise = Rx.Observable.fromPromise(promisePOIs);
    obsvPromise.subscribe(
        function (result) {
            setState({ isFetchingData: false, data: result, error: false})
            if (typeof callback === 'function') callback(getCurrentState());
        },
        function (err) {
            setState({ isFetchingData: false, error: true, data: [] })
            if (typeof callback === 'function') callback(getCurrentState());
            console.error(err);
        }
    )
}

function fetchPOIsDetailData(callback) {
    var promisePOIs = fetchApiPOIsDetailData();
    var obsvPromise = Rx.Observable.fromPromise(promisePOIs);
    obsvPromise.subscribe(
        function (result) {
            setState({ isFetchingData: false, data: result, error: false})
            if (typeof callback === 'function') callback(getCurrentState());
        },
        function (err) {
            setState({ isFetchingData: false, error: true, data: [] })
            if (typeof callback === 'function') callback(getCurrentState());
            console.error(err);
        }
    )
}

function fetchPOIsDetailDataCondominiums(callback) {
    var promisePOIs = fetchApiPOIsDetailDataCondominiums();
    var obsvPromise = Rx.Observable.fromPromise(promisePOIs);
    obsvPromise.subscribe(
        function (result) {
            setState({ isFetchingData: false, data: result, error: false })
            if (typeof callback === 'function') callback(getCurrentState());
        },
        function (err) {
            setState({ isFetchingData: false, error: true, data: [] })
            if (typeof callback === 'function') callback(getCurrentState());
            console.error(err);
        }
    )
}

function TreasuryMap(clientMapElementName) {
    this.targetMapElement = clientMapElementName;
}

TreasuryMap.prototype.createMap = function (onLoadedFunction) {
    alert(this.targetMapElement);
    this.mapElement = document.getElementById(this.targetMapElement); alert(this.mapElement);
    //this.mapElement.src = 'https://p-staging.treasury.go.th/TD2';
    this.mapElement.src = 'https://www.nokair.com';
    this.gisWindow = null;
    alert($('#' + this.targetMapElement));
    $('#' + this.targetMapElement).load(function () {
        try {
            alert('start set' + ' # ' + this);
            this.gisWindow = document.getElementById('mymap').contentWindow; alert(this.gisWindow);
            if (typeof (onLoadedFunction) != 'undefined') {
                onLoadedFunction();
            }
        } catch (e) {
            alert(e.message);
        }
        
    });
   /* this.mapElement.onload = function () {
        this.gisWindow = this.mapElement.contentWindow; alert(gisWindow);
        if (typeof (onLoadedFunction) != 'undefined') {
            onLoadedFunction();
        }
    }*/

}

TreasuryMap.prototype.clear = function () {
    this.gisWindow.GIS.removeGraphic();
}

$(window).ready(function () {
    alert("ready!");
    var myMap = new TreasuryMap('mymap');
    myMap.createMap(function () {
        alert('start to clone');
        var d = document.getElementById('mymap2');

        var frameDocument = d.document;
        if (d.contentDocument)
            frameDocument = d.contentDocument;
        else if (d.contentWindow)
            frameDocument = d.contentWindow.document;

        // We open the document of the empty frame and we write desired content.
        // originalHtmlContent is a string where you have the source iframe HTML content.
        frameDocument.open();
        frameDocument.writeln(document.getElementById('mymap').contentWindow);
        frameDocument.close();

    });
});
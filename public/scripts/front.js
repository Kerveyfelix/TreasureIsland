(function exportFunctions() {
    function renderMap(matrixPlane) {
        console.log(matrixPlane)
        let counter = 1;

        for(let i = 0; i < matrixPlane.length; i++) {

            let groundRow = document.createElement('tr');
            groundRow.dataset.rowIndex = i;
            document.querySelector('table').appendChild(groundRow);

            for(let j = 0; j < matrixPlane[i].length; j++) {
                let groundTile = document.createElement('td');
                groundTile.dataset.index = counter;
                if(!matrixPlane[i][j]) {
                    groundTile.dataset.type = 'path'
                } else {
                    const cactus = document.createElement('div');
                    cactus.setAttribute("class", "cactus");
                    groundTile.dataset.type = 'obstacle';
                    groundTile.appendChild(cactus);
                }

                document.querySelector(`tr[data-row-index='${i}']`).appendChild(groundTile);

                counter++;
            }
        }
    }

    function httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true);
        xmlHttp.send(null);
    }

    if(typeof module !== 'undefined' && module.exports) {
        module.exports = {
            httpGet,
            renderMap
        }
    } else {
        window.httpGetAsync = httpGetAsync;
        window.renderMap = renderMap;
    }
})()
// Dependencies initialization
var http = require('http');
var fs = require('fs');
var methods = Object.create(null);

// Initializing HTTP server
http.createServer(
    function (request, response) {
        function respond(code, body, type) {
            if (!type) type = 'text/plain';
            response.writeHead(code, {
                'Content-Type': type,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'OPTIONS, PUT'
            });
            if (body && body.pipe) {
                body.pipe(response);
            } else { response.end(body); }
        }
        if (request.method in methods) {
            methods[request.method](
                validatePath(request.url), respond, request
            );
        } else {
            respond(405, 'Method ' + request.method +
                ' not allowed.');
        }
    }).listen(8000);

function validatePath(url) {
    // -------- Change core folder name ------------
    // Repeating until replacement isn't needed
    return ('./testdir' + decodeURIComponent(url)).replace(/\/{2,}/g, '/')
        .replace(/ /g, '').replace(/[?#].+$/, '');
}

// GET method
methods.GET = function (path, respond, req) {
    // If specific JSON required
    if (req.url.includes('?type=json')) {
        fs.stat(path, function (error, stats) {
            if (error && error.code === 'ENOENT') {
                respond(404, JSON.stringify({
                    type: 'error',
                    data: 'File not found!'
                }, null, 4), 'text/plain; charset=utf-8');
            } else if (error) {
                respond(500, error.toString());
                // If directory is requested
            } else if (stats.isDirectory()) {
                fs.readdir(path, function (error, fileNames) {
                    if (error) {
                        respond(500, JSON.stringify({
                            type: 'error',
                            data: error.message
                        }, null, 4), 'text/plain; charset=utf-8');
                    } else {
                        // Creating promises for every file requested
                        var promises = [];
                        fileNames.forEach(function (fileName) {
                            promises.push(new Promise(
                                function (resolve, reject) {
                                // Checking if file exists
                                    fs.stat(path + '/' + fileName,
                                        function (error, subStats) {
                                            if (error) {
                                                reject(error.message);
                                            } else {
                                                // Sending file/dir name
                                                resolve({
                                                    type: subStats.isDirectory() ? 'dir' : 'file',
                                                    name: fileName
                                                });
                                            }
                                        });
                                }));
                        });
                        Promise.all(promises).then(function (data) {
                            // console.log(data);
                            respond(200, JSON.stringify({
                                type: 'dir',
                                // Sorting files in alphabetic order
                                data: data.sort(function (a, b) {
                                    if (a.name > b.name) return 1;
                                    return 0;
                                    // Displaying folders on top of list
                                }).sort(function (a, b) {
                                    if (a.type !== b.type) return -1;
                                    return 0;
                                })
                            }, null, 4), 'text/plain; charset=utf-8');
                        }).catch(function (message) {
                            respond(500, JSON.stringify({
                                type: 'error',
                                data: message
                            }, null, 4), 'text/plain; charset=utf-8');
                        });
                    }
                });
            } else {
                fs.readFile(path, function read(error, data) {
                    // Responding with error JSON
                    if (error) {
                        respond(500, JSON.stringify({
                            type: 'error',
                            data: error.message
                        }, null, 4), 'text/plain; charset=utf-8');
                    }
                    // Responding with data JSON
                    respond(200, JSON.stringify({
                        type: 'file',
                        data: data.toString()
                    }, null, 4), 'text/plain; charset=utf-8');
                });
            }
        });
    } else {
        // Displaying whole page
        fs.readFile('./Task39.html', function read(error, data) {
            if (error) {
                respond(500, error.toString());
            }
            respond(200, data, 'text/html; charset=utf-8');
        });
    }
};

// PUT method function
methods.PUT = function (path, respond, req) {
    var outStream = fs.createWriteStream(path);
    outStream.on('error', function (error) {
        respond(500, JSON.stringify({
            ok: false,
            error: error.message
        }, null, 4), 'text/plain; charset=utf-8');
    });
    outStream.on('finish', function () {
        respond(204, JSON.stringify({
        }, null, 4), 'text/plain; charset=utf-8');
    });
    req.pipe(outStream);
};

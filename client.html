<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <title>Space</title>
        <style>
            /*Global styles*/
            html, body, #editor {
                height: 100%;
            }
            /*Editor area*/
            #editor {
                display: flex;
                flex-direction: column;
            }
            /*All tags*/
            * {
                font-family: sans-serif;
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                color: black;
                font-size: 18px;
                text-decoration: none;
            }
            #files {
                display: none;
            }
            #editor {
                display: none;
            }
            #loading {
                margin: 10px;
            }
            /*Files and folders*/
            .link {
                display: flex;
                align-items: center;
                cursor: pointer;
                padding: 10px 30px;
                border-bottom: 1px dotted #d2d2d2;
            }
            /*Icons*/
            .link svg {
                margin-right: 24px;
                height: 40px;
                width: 40px;
            }
            /*While there's a cursor hovers the button*/
            .link:hover {
                background: #dfeaff;
            }
            /*Editor area*/
            textarea {
                width: 100%;
                background: #eeeeee;
                padding: 10px 30px;
                border: none;
                outline: none;
            }
            /*"Save changes" button*/
            button {
                margin: 10px;
                background: #abcb91;
                padding: 10px 30px;
                border: none;
            }
            /*Button when clicked*/
            button:active {
                border: none;
                background: #85af6d;
            }
        </style>
    </head>
    <body>
        <button id="back" onclick="history.back()" style="display: none">Go back</button>
        <!--Loading sign-->
        <div id="loading">
            <p>LOADING...</p>
        </div>
        <!--Files area-->
        <div id="files">
            <div id="files-container"></div>
        </div>
        <!--Files editor-->
        <div id="editor">
            <textarea style="flex: 1;"
                      placeholder="File text" id="file-text"></textarea>
            <!--Save changes button-->
            <button onclick="saveChanges()">Save changes</button><br/>
        </div>
        <script>
            // Node elements initialization
            var $loading = document.getElementById('loading');
            var $files = document.getElementById('files');
            var $filesContainer = document.getElementById('files-container');
            var $editor = document.getElementById('editor');
            var $fileText = document.getElementById('file-text');
            var $back = document.getElementById('back');
            var path = location.pathname;

            // Data from fetched file
            var objData = '';
            // Whether current file state is saved
            var saved = false;

            // Fetch on first document load
            fetch('http://localhost:8000' + path + '?type=json')
                .then(function (res) {
                    return res.json()}).then(function (obj) {
                $loading.style.display = 'none';
                    // Display back button if not in core folder
                    if (path !== "/") {
                        $back.style.display = "block"
                    }
                    // If directory is requested
                    if (obj.type === 'dir') {
                        $files.style.display = 'block';
                        // If there are any files fetched
                        if (obj.data.length) {
                            obj.data.forEach(function (item) {
                                // Assemble each file node
                                var $a = document.createElement('a');
                                $a.href = location.origin + (path + '/' +
                                    item.name).replace(/\/{2,}/g, '/');
                                $a.classList.add("link", item.type)
                                // Whether file is a directory or not
                                // inserting corresponding HTML
                                    $a.innerHTML = item.type === 'dir' ?
                                        `<svg width=\"512\" height=\"512\" x=\"0\" y=\"0\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512\" xml:space=\"preserve\"><g><path d=\"m187 87.3c0-10-8.1-18.1-18.1-18.1h-148.8c-10 .1-18.1 8.2-18.1 18.1v337.3c0 10 8.1 18.1 18.1 18.1h400.7c10 0 18.1-8.1 18.1-18.1v-301.1c0-10-8.1-18.1-18.1-18.1h-215.7c-10 0-18.1-8.1-18.1-18.1z\" fill=\"#fdc77c\"</svg>`
                                        :
                                        `<svg width=\"512\" height=\"512\" x=\"0\" y=\"0\" viewBox=\"0 0 512 512\"<g><g><path d=\"m339.4 2h-280v508h393.2v-394.7z\"fill=\"#eff3f5\"/><path d=\"m339.4 115.3h113.2l-113.2-113.3z\" fill=\"#dbdfe0\" /><g fill=\"#dbdfe0\"><path d=\"m261.6 169.3h130.8v30.1h-130.8z\"fill=\"#dbdfe0\"/><path d=\"m119.6 253.4h272.9v30.1h-272.9z\"fill=\"#dbdfe0\"/><path d=\"m119.6 337.5h272.9v30.1h-272.9z\"fill=\"#dbdfe0\"/><path d=\"m119.6 417.3h272.9v30.1h-272.9z\"fill=\"#dbdfe0\"/></g><path d=\"m119.6 85.2h95.7v114.2h-95.7z\"fill=\"#5ac8ae\"/></svg>`
                                // Inserting file name node
                                var $nameDiv = document.createElement("p")
                                $nameDiv.innerHTML = item.name
                                $a.appendChild($nameDiv)
                                $filesContainer.appendChild($a);
                            });
                        } else {
                            // Display empty folder sign
                            var $p = document.createElement('p');
                            $p.style.margin = 10 + 'px';
                            $p.innerText = "This folder is empty."
                            $filesContainer.appendChild($p);
                        }
                        // If file is requested
                    } else if (obj.type === 'file') {
                        $editor.style.display = 'block';
                        $fileText.value = obj.data;
                        objData = obj.data;
                    } else {
                        // Display file data
                        $files.style.display = 'block';
                        $p = document.createElement('p');
                        $p.innerText = obj.data;
                        $filesContainer.appendChild($p);
                    }
            })
            $editor.addEventListener("change", function () {
                saved = false;
            })
            function saveChanges() {
                saved = true;
                fetch('http://localhost:8000' + path, {
                    method: "PUT",
                    body: $fileText.value
                })
                alert("Changes are saved.")
            }
            // If no changes saved asking whether
            // user wants to leave
            window.onbeforeunload = function() {
                if (objData !== $fileText.value && !saved)
                return 'Dialog text here.';
            };
        </script>
    </body>
</html>




function compress(file, options, callback) {
    const reader = new FileReader();
    reader.onload = function (event) {
        if (options.compress === false) {
            file.base64 = event.target.result;
        }
    }
}

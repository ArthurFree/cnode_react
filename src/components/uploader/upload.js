import utils from 'utils';

export default function upload(options) {
    const { url, file, fileVal } = options;
    const { name, type, lastModifieDate } = file;
    const data = {
        name,
        type,
        size: options.type == 'file' ? file.size : file.base64.length,
        lastModifieDate,
    }

    const formData = new FormData();

    // 设置参数
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });

    if (options.type == 'file') {
        formData.append(fileVal, file, name);
    } else {
        formData.append(fileVal, file.base64);
    }

    utils.ajax({
        baseURL: '',
        url: '',
        method: 'post',
        data: formData,
        withCredentials: false,
    });

}

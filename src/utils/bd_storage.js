import bd_utils from "./bd_utils";

const storage = window.localStorage;

export default {
    /**
     * 增
     * @param key
     * @param value
     */
    set: function (key, value) {

        if (bd_utils.isEmpty(key) || bd_utils.isEmpty(value)) {
            return;
        }

        try {
            value = JSON.stringify(value);
        } catch (e) {
            console.error(e);
            console.error('localStorage JSON.stringify() 转换异常');
        } finally {
            storage.setItem(key, value);
        }

    },

    /**
     * 删
     * @param key
     */
    remove: function (key) {
        if (bd_utils.isEmpty(key)) {
            console.error('localStorage key is undefined');
            return;
        }
        storage.removeItem(key);
    },

    /**
     * 清空
     */
    clear: function () {
        storage.clear();
    },

    /**
     * 查
     * @param key
     * @returns {string|any}
     */
    get: function (key) {

        let dataStr = storage.getItem(key);

        try {
            let data = JSON.parse(storage.getItem(key));
            if (typeof data == 'object' && data) {
                return data;
            } else {
                return dataStr;
            }
        } catch (e) {
            console.error(e);
            console.error('localStorage JSON.parse() 转换异常')
            return dataStr;
        }
    }
}

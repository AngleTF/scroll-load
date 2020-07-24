;(function (w) {

    class scrollLoad {

        constructor(config) {

            let {
                loadOffset = 30, loadFun = () => {
                }, initPage = 1, scrollArea = window,
                autoLoad = true
            } = config;

            this.loadOffset = loadOffset;
            this.callback = loadFun;
            this.page = initPage;
            this.scrollArea = scrollArea;
            this.loadMore = this.loadMore.bind(this);
            this.isReady = true;
            this.autoLoad = autoLoad;

            this.element = null;
            this.target = null;

            this.init();
        }

        init() {

            let select = this.scrollArea;

            if (!select) {
                return;
            }

            if (typeof select === 'string') {
                let node = document.querySelector(select);
                if (node) {
                    this.element = node;
                }
            }

            if (typeof select === 'object') {
                this.element = select;
            }

            if (select instanceof Window || select.nodeType === 9) {
                this.target = document.documentElement;
            } else {
                this.target = this.element;
            }

            this.addScrollEvent();

            if (this.autoLoad) {
                this.callback(++this.page, this);
            }
        }


        removeScrollEvent() {
            if (this.element) {
                this.element.removeEventListener('scroll', this.loadMore);
            }
        }

        addScrollEvent() {
            if (this.element) {
                this.element.addEventListener('scroll', this.loadMore);
            }
        }

        realHeight() {
            return this.target.scrollHeight;
        }

        scrollTop() {
            return this.target.scrollTop;
        }

        eleHeight() {
            return this.target.clientHeight;
        }

        loadMore() {

            const realHeight = this.realHeight();
            const scrollTop = this.scrollTop();
            const eleHeight = this.eleHeight();

            if (eleHeight + scrollTop + this.loadOffset >= realHeight && this.isReady) {
                this.isReady = false;
                this.callback(this.page, this);
                this.page++
            }
        }

        ready() {
            this.isReady = true;
        }

        lock() {
            this.isReady = false;
        }
    }

    if (typeof module !== "undefined" && module.exports) {
        module.exports = scrollLoad;
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return scrollLoad;
        });
    } else {
        w.scrollLoad = scrollLoad
    }

})(window);
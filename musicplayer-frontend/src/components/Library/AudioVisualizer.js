window.AudioContext = window.AudioContext || window.webkitAudioContext;

var renderWave =  (function () {
    function renderWave(message) {
        var _this = this;
        this._samples = 10000;
        this._strokeStyle = "#3098ff";
        this.audioContext = new AudioContext();
        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.data = [];
        message
            .then(function (arrayBuffer) {
            return _this.audioContext.decodeAudioData(arrayBuffer);
        })
            .then(function (audioBuffer) {
            _this.draw(_this.normalizedData(audioBuffer));
            _this.drawData(_this.data);
        });
    }
    renderWave.prototype.normalizedData = function (audioBuffer) {
        var rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
        var samples = this._samples; // Number of samples we want to have in our final data set
        var blockSize = Math.floor(rawData.length / samples); // Number of samples in each subdivision
        var filteredData = [];
        for (var i = 0; i < samples; i++) {
            filteredData.push(rawData[i * blockSize]);
        }
        return filteredData;
    };
    renderWave.prototype.draw = function (normalizedData) {
        // set up the canvas
        var canvas = this.canvas;
        var dpr = window.devicePixelRatio || 1;
        var padding = 10;
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
        this.ctx.scale(dpr, dpr);
        this.ctx.translate(0, canvas.offsetHeight / 2 + padding); // set Y = 0 to be in the middle of the canvas
        // draw the line segments
        var width = canvas.offsetWidth / normalizedData.length;
        for (var i = 0; i < normalizedData.length; i++) {
            var x = width * i;
            var height = normalizedData[i] * canvas.offsetHeight - padding;
            if (height < 0) {
                height = 0;
            }
            else if (height > canvas.offsetHeight / 2) {
                height = height > canvas.offsetHeight / 2;
            }
            // this.drawLineSegment(this.ctx, x, height, width, (i + 1) % 2);
            this.data.push({
                x: x,
                h: height,
                w: width,
                isEven: (i + 1) % 2
            });
        }
        return this.data;
    };
    renderWave.prototype.drawLineSegment = function (ctx, x, height, width, isEven, colors) {
        if (colors === void 0) { colors = this._strokeStyle; }
        ctx.lineWidth = 1; // how thick the line is
        ctx.strokeStyle = colors; // what color our line is
        ctx.beginPath();
        height = isEven ? height : -height;
        ctx.moveTo(x, 0);
        ctx.lineTo(x + width, height);
        ctx.stroke();
    };
    renderWave.prototype.drawData = function (data, colors) {
        var _this = this;
        if (colors === void 0) { colors = this._strokeStyle; }
        data.map(function (item) {
            _this.drawLineSegment(_this.ctx, item.x, item.h, item.w, item.isEven, colors);
        });
    };
    renderWave.prototype.drawTimeline = function (percent) {
        var end = Math.ceil(this._samples * percent);
        var start = end - 5 || 0;
        var t = this.data.slice(0, end);
        this.drawData(t, "#1d1e22");
    };
    return renderWave;
}());

export default renderWave
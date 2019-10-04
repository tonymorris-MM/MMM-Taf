Module.register("MMM-Taf", {

    defaults: {
        icaoList: ['YBAF', 'YBBN', 'YAMB', 'YBCG', 'YBOK','YBNA', 'YSTW']
    },
    start: function() {
        this.results = [];
        this.getResults();
    },
    getStyles: function() {
        return ['MMM-Taf.css'];
    },
    getResults: function() {
        var self = this;
        this.config.icaoList.forEach(function(icao) {
            var url = 'http://metar.online/taf/' + icao;
            self.sendSocketNotification('MMM_TAF', url);
        });
    },
    getDom: function() {
        var wrapper = document.createElement('div');
        var self = this;
        this.results.forEach(function(entry) {
            var wrapperDiv = document.createElement('div');
            var wrapperBreak = document.createElement('br');
            entry.forEach(function(entry) {
                var entryDiv = document.createElement('div');
                entryDiv.innerHTML = entry;
                entryDiv.className = "entrydiv";
                wrapperDiv.appendChild(entryDiv);
            });
            wrapper.appendChild(wrapperDiv);
            wrapper.appendChild(wrapperBreak);
        });
        return wrapper;
    },
    socketNotificationReceived: function(notification, payload) {
        this.results.push(payload.split('\n'));
        this.updateDom();
    }
});
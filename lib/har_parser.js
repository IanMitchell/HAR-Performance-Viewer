export class Parser {
  constructor() {
    this.fs = require('fs');
    this.domains = require('../config/domains');
    this.pages = require('../config/pages');

    this.requestData = {};
    this.byteSizeData = {};
    this.timeData = {};
    this.lastDate = '';
  }

  addRequests(page, date) {
    console.info('Adding Requests for ' + date);

    let json = require('../har/' + date + '-' + page);

    this.requestData[page].push({
      date: date,
      internal: this.getInternalRequests(json),
      external: this.getExternalRequests(json)
    });
  }

  getInternalRequests(json) {
    console.info('Getting External Requests');

    let counter = {
      total: 0,
      html: 0,
      css: 0,
      script: 0,
      image: 0,
      other: 0
    }

    for (let i = 0; i < json.log.entries.length; i++) {
      let request = json.log.entries[i];

      if (this.isInternalResource(request.request.url)) {
        counter.total++;

        if (request.response.content.mimeType.indexOf('html') > -1) {
          counter.html++;
        }
        else if (request.response.content.mimeType.indexOf('css') > -1) {
          counter.css++;
        }
        else if (request.response.content.mimeType.indexOf('javascript') > -1) {
          counter.script++;
        }
        else if (request.response.content.mimeType.indexOf('image') > -1) {
          counter.image++;
        }
        else {
          counter.other++;
        }
      }
    }

    return counter;
  }

  getExternalRequests(json) {
    console.info('Getting External Requests');

    let counter = {
      total: 0,
      html: 0,
      css: 0,
      script: 0,
      image: 0,
      other: 0
    }

    for (let i = 0; i < json.log.entries.length; i++) {
      let request = json.log.entries[i];

      if (!this.isInternalResource(request.request.url)) {
        counter.total++;

        if (request.response.content.mimeType.indexOf('html') > -1) {
          counter.html++;
        }
        else if (request.response.content.mimeType.indexOf('css') > -1) {
          counter.css++;
        }
        else if (request.response.content.mimeType.indexOf('javascript') > -1) {
          counter.script++;
        }
        else if (request.response.content.mimeType.indexOf('image') > -1) {
          counter.image++;
        }
        else {
          counter.other++;
        }
      }
    }

    return counter;
  }

  addByteSize(page, date) {
    console.info('Adding External Byte Size');

    let json = require('../har/' + date + '-' + page);

    this.byteSizeData[page].push({
      date: date,
      internal: this.getInternalByteSize(json),
      external: this.getExternalByteSize(json)
    });
  }

  getInternalByteSize(json) {
    console.info('Getting Internal Byte Size');

    let counter = {
      total: 0,
      html: 0,
      css: 0,
      script: 0,
      image: 0,
      other: 0
    }

    for (let i = 0; i < json.log.entries.length; i++) {
      let request = json.log.entries[i];

      if (this.isInternalResource(request.request.url)) {
        counter.total += request.response.content.size;

        if (request.response.content.mimeType.indexOf('html') > -1) {
          counter.html += request.response.content.size;
        }
        else if (request.response.content.mimeType.indexOf('css') > -1) {
          counter.css += request.response.content.size;
        }
        else if (request.response.content.mimeType.indexOf('javascript') > -1) {
          counter.script += request.response.content.size;
        }
        else if (request.response.content.mimeType.indexOf('image') > -1) {
          counter.image += request.response.content.size;
        }
        else {
          counter.other += request.response.content.size;
        }
      }
    }

    return counter;
  }

  getExternalByteSize(json) {
    console.info('Getting External Byte Size');

    let counter = {
      total: 0,
      html: 0,
      css: 0,
      script: 0,
      image: 0,
      other: 0
    }

    for (let i = 0; i < json.log.entries.length; i++) {
      let request = json.log.entries[i];

      if (!this.isInternalResource(request.request.url)) {
        counter.total += request.response.content.size;;

        if (request.response.content.mimeType.indexOf('html') > -1) {
          counter.html += request.response.content.size;;
        }
        else if (request.response.content.mimeType.indexOf('css') > -1) {
          counter.css += request.response.content.size;;
        }
        else if (request.response.content.mimeType.indexOf('javascript') > -1) {
          counter.script += request.response.content.size;;
        }
        else if (request.response.content.mimeType.indexOf('image') > -1) {
          counter.image += request.response.content.size;;
        }
        else {
          counter.other += request.response.content.size;;
        }
      }
    }

    return counter;
  }

  addTime(page, date) {
    console.info('Adding Time Data');

    let json = require('../har/' + date + '-' + page);

    this.timeData[page].push({
      date: date,
      internal: this.getInternalTime(json),
      external: this.getExternalTime(json)
    });
  }

  getInternalTime(json) {
    console.info('Getting Internal Time');

    let counter = {
      total: 0,
      html: 0,
      css: 0,
      script: 0,
      image: 0,
      other: 0
    }

    for (let i = 0; i < json.log.entries.length; i++) {
      let request = json.log.entries[i];

      if (this.isInternalResource(request.request.url)) {
        counter.total += request.time;

        if (request.response.content.mimeType.indexOf('html') > -1) {
          counter.html += request.time;
        }
        else if (request.response.content.mimeType.indexOf('css') > -1) {
          counter.css += request.time;
        }
        else if (request.response.content.mimeType.indexOf('javascript') > -1) {
          counter.script += request.time;
        }
        else if (request.response.content.mimeType.indexOf('image') > -1) {
          counter.image += request.time;
        }
        else {
          counter.other += request.time;
        }
      }
    }

    return counter;
  }

  getExternalTime(json) {
    console.info('Getting External Time');

    let counter = {
      total: 0,
      html: 0,
      css: 0,
      script: 0,
      image: 0,
      other: 0
    }

    for (let i = 0; i < json.log.entries.length; i++) {
      let request = json.log.entries[i];

      if (!this.isInternalResource(request.request.url)) {
        counter.total += request.time;

        if (request.response.content.mimeType.indexOf('html') > -1) {
          counter.html += request.time;
        }
        else if (request.response.content.mimeType.indexOf('css') > -1) {
          counter.css += request.time;
        }
        else if (request.response.content.mimeType.indexOf('javascript') > -1) {
          counter.script += request.time;
        }
        else if (request.response.content.mimeType.indexOf('image') > -1) {
          counter.image += request.time;
        }
        else {
          counter.other += request.time;
        }
      }
    }

    return counter;
  }

  isInternalResource(url) {
    if (url === undefined) {
      console.error('Undefined URL.');
      return false;
    }
    else {
      for (let i = 0; i < this.domains.internal.length; i++) {
        if (url.indexOf(this.domains.internal[i]) == 0) {
          //console.info('Internal Domain: ' + url);
          return true;
        }
      }

      //console.log('External Domain: ' + url);
      return false;
    }
  }

  parseDate(page, date) {
    console.info('Adding data...');
    this.addRequests(page, date);
    this.addByteSize(page, date);
    this.addTime(page, date);
  }

  parsePage(page) {
    this.fs.readdir('./har/', (error, files) => {
      if (error) {
        console.error("Error parsing page: " + page + ". " + error);
      }
      else {
        if (this.lastDate === undefined || this.lastDate == '') {
          console.log('No last date detected. Setting to 1-1-2000');
          this.lastDate = '1-1-2000';
        }

        for (let i = 0; i < files.length; i++) {
          let name = files[i];

          console.info('Looking at File: ' + name);

          if (name.indexOf(page) > -1) {
            let date = name.substr(0, name.indexOf('-' + page));

            if (date > this.lastDate) {
              console.log('Data untracked. Parsing.');
              this.parseDate(page, date);
              this.lastDate = date;
            }
          }
        }
      }
    });
  }

  parseAllPages() {
    console.info("Parsing All Pages:");
    console.info(this.pages.pages);

    for (let i = 0; i < this.pages.pages.length; i++) {
      let page = this.pages.pages[i];

      this.requestData[page] = [];
      this.byteSizeData[page] = [];
      this.timeData[page] = [];

      console.info('Parsing ' + page);
      this.parsePage(page);
    }
  }
}

'use strict';

var fs = require('fs');

/*
 * Generate template
 * @param(res) res
 * @param(template)
 *
 */
exports.template = function(res, template, variables){
	variables.enviroment = (process.env.NODE_ENV === 'production') ? process.env.NODE_ENV : 'development';
	res.render(template, variables);
};


/**
 * Cache helpers
 */
var cache = exports.cache = {

  /**
   * Base path for caching for our app
   * @type {string}
   */
  baseCachePath :  process.cwd() + '/cache/',

  /**
   * Check if the cache for the specified file exist, adn return it if yes
   * @param  {string} fileName to check
   * @param  {number} time     time in second to check
   * @return {boolean/json}
   */
  returnCache: function(fileName, time){
    var fileUpdate = cache.readCache(fileName).mtime || false,
        lastUpdate = fileUpdate ? (new Date().getTime() - new Date(fileUpdate).getTime()) / 1000 : false,
        data;
    if(lastUpdate && lastUpdate < time){
      data = cache.getCache(fileName);
      if(data){
        return JSON.parse(data);
      }else{
        return false;
      }
    }else{
      return false;
    }
  },

  /**
   * Returns the fullfile path
   * @param  {file} file - file name
   * @return {string} full file path
   */
  basePathFile : function(file){
    file = string.slug(file);
    return (cache.baseCachePath + file + '.json');
  },

  /**
   * Get the cached file
   * @param  {file} file - file name
   * @return {object} file content or false if it doesnt exists
   */
  getCache : function(file){
    file = cache.basePathFile(file);
    return fs.existsSync(file) ? fs.readFileSync(file, 'utf8' ) : false;
  },

  /**
   * Read the file properties
   * @param  {string} file - file name
   * @return {object} file properties or false if it doesnt exists
   */
  readCache : function(file){
    file = cache.basePathFile(file);
    return fs.existsSync(file) ? fs.statSync(file) : false;
  },

  /**
   * Store data in file
   * @param  {filenam} file - file name
   * @param  {object} data to storeCache
   * @return {void}
   */
  storeCache : function(file, data){
    if(typeof data === 'object'){
      data = JSON.stringify(data);
    }
    if(!data || data === '[]' || data === '{}'){
      return;
    }
    file = cache.basePathFile(file);
    fs.writeFileSync(file, data);
  }
};

var string = exports.string = {
  slug: function(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñçľščťžýň·/_,:;';
    var to   = 'aaaaaeeeeeiiiiooooouuuunclsctzyn------';
    for (var i=0, l=from.length ; i<l ; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '') // collapse whitespace and replace by space
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }
};

var minify = require("html-minifier").minify;
var UglifyJS = require("uglify-js");

exports.setup = 
{
	title: "Code Minifer",
	description: "Automagically minify your html and js",
	version: "0.0.2",
	on: true,
	reloadAll: true,
}

function minifyIt(_src)
{
    return minify(_src, 
    {
	  includeAutoGeneratedTags: false,
	  removeComments: true,
	  trimCustomFragments: true,
	  removeEmptyLines: true,
	  collapseWhitespace: true,
	  collapseBooleanAttributes: true,
	  decodeEntities: true,
	});
}

async function stripCode(_obj)
{
    if(_obj.event == "instance.forge.main")
    {
        _obj.data = minifyIt(_obj.data);
    }
    else if(_obj.event == "instance.load.theme")
    {
        for(var d in _obj.data)
    	{
    		try
    		{
				var _ext = path.extname(d);
                if(typeof d == "string")
        		{
					if(_ext == ".html")
        			{
        				_obj.data[d] = minifyIt(_obj.data[d]);
        			}
        			else if(_ext == ".js")
        			{
        				_obj.data[d] = UglifyJS.minify(_obj.data[d]).code;
        			}
        		}
    		}catch(e){}
    	}
    }
    else 
    {
    	for(var d in _obj.data)
    	{
    		try 
    		{
    			_obj.data[d] = minifyIt(_obj.data[d]);
    		}catch(e){}
    		
    		
    	}
    }
}

exports.event = 
{
    "instance.forge.main":
    {
	    position: 0,
	    on: true,
	    handler: stripCode,
	},
	"instance.load.theme":
	{
	    position: 0,
	    on: true,
	    handler: stripCode,
	},
	"instance.load.page":
	{
	    position: 0,
	    on: true,
	    handler: stripCode,
	},
	"instance.load.template.page":
	{
	    position: 0,
	    on: true,
	    handler: stripCode,
	},
}
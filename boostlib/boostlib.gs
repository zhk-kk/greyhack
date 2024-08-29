// Boost library.
// SEE: https://github.com/zhk-kk/greyhack/tree/main/boostlib
string.s = function(self)
	return self.replace("\\n", char(10))
end function
boost = {}
boost.stringUtils = {}
boost.stringUtils.trimLeft = function(self, str, charsToRemove=null)
	if charsToRemove == null then charsToRemove = [" ", char(10)]
	padding = 0
	for ch in str
		if indexOf(charsToRemove, ch) == null then break
		padding = padding + 1
	end for
	return str[padding:]
end function
boost.stringUtils.trimRight = function(self, str, charsToRemove=null)
	if charsToRemove == null then charsToRemove = [" ", char(10)]
	i = str.len-1
	while i > 0
		ch = str[i]
		if indexOf(charsToRemove, ch) == null then break
		i = i - 1
	end while
	return str[:i]
end function
boost.stringUtils.trim = function(self, str, charsToRemove=null)
	return self.trimLeft(self.trimRight(str, charsToRemove), charsToRemove)
end function
boost.stream = {}
boost.stream.Stream = { "classID": "Stream"}
boost.stream.Stream.next = function (skip=0)
	return null
end function
boost.stream.Stream.peek = function (offset=0)
	return null
end function
boost.stream.Stream.collect = function
	c = []
    n = self.next
    while n != null
        c = c + n
    end while
    return c
end function
boost.stream.array_stream = function (array)
	s = new self.Stream
	s._internal = {}
	s._internal.array = array
	s._internal.index = 0
	s.peek = function (offset=0)
		i = s._internal.index + offset
		if i >= s._internal.array.len then return null
		e = s._internal.array[i]
		return e
	end function
	s.next = function (skip=0)
		e = s.peek(skip)
		s._internal.index = s._internal.index + skip + 1
		return e
	end function
	return s
end function

// Export as dynlib
export_dynlib = function (lib, dlname, version_number=0, description="", author="")
	if params.len < 1 then return false
	dlId = params[0]
	obj = get_custom_object
	if not obj.hasIndex("_dynlib") or not obj._dynlib.hasIndex(dlId) then return false
	obj._dynlib[dlId].lib = lib
	obj._dynlib[dlId].about = {"name": dlname, "version": version_number, "description": description, "author": author}
	obj._dynlib[dlId].format_version = 1
	return true
end function
is_loaded_as_dynlib = function ()
	if params.len < 1 then return false 
	obj = get_custom_object
	if not obj.hasIndex("_dynlib") or not obj._dynlib.hasIndex(params[0]) then return false
	return true
end function
if not is_loaded_as_dynlib then exit("This is a .dynlib library, not an executable.\nPlease, refer to https://github.com/zhk-kk/greyhack/tree/main/dynlib for further info.")
export_dynlib(boost, "boostlib", 0, "Adds methods and functions that should've been in standart library.", "ZHK")
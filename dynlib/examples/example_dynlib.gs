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

lib = {}
lib.hello_world = function ()
	print("Hello, World!")
end function

export_dynlib(lib, "example", 0, "An example dynlib", "zhk")
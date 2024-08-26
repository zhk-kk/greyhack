// Library structure
lib = {
	"_internal": {
		"state": {
			"count": 0,
		},
	},
}

// Public function "count"
lib.count = function (self)
	self._internal.state.count = self._internal.state.count + 1
	return self._internal.state.count 
end function

// Export the library structure.
export_dynlib = function (lib)
	if params.len < 1 then return
	dlId = params[0]
	obj = get_custom_object
	if not obj.hasIndex("_dynlib") or not obj._dynlib.hasIndex(dlId) then return
	obj._dynlib[dlId].lib = lib
end function

export_dynlib(lib)
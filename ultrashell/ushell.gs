USHELL_VERSION_STRING = "0.1.0"

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

style = function ()
	s = {"color":null,"isItalic":false,"isBold":false}
	s.set_color = function (self, color)
		self.color = color
		return self
	end function
	s.set_italic = function (self, isItalic)
		self.isItalic = isItalic
		return self
	end function
	s.set_bold = function (self, isBold)
		self.isBold = isBold
		return self
	end function
	s.apply = function (self, str)
		ctag = "<color="+s.color+">"
		r = str.s
		apply_tag = function (s, open, close)
			return open+s.split(char(10)).join(close+char(10)+open)+close
		end function
		if self.color != null then r = apply_tag(r, ctag, "</color>")
		if self.isItalic then r = apply_tag(r, "<i>", "</i>")
		if self.isBold then r = apply_tag(r, "<b>", "</b>")
		return r
	end function
	return s
end function

theme = {}
theme.text = function ()
	return style().set_color("white")
end function
theme.important = function ()
	return style().set_color("orange")
end function
theme.error = function ()
	return style().set_color("red").set_bold(true)
end function
theme.warn = function ()
	return style().set_color("yellow")
end function
theme.task = function ()
	return style().set_color("#00FFFF")
end function

ushScript = {}
ushScript.tokenizer = function (stream)
	tokenizer = {
		"stream": stream,
		"row": 0,
		"col": 0,
		"ch": null,
	}
	tokenizer.advance_char = function
		
	end function
	tokenizer.tokenize = function
		
	end function
	return tokenizer
end function
ushScript.parser = function ()
	parser = {}
	return parser
end function
ushScript.interpreter = function ()
	interpreter = {}
	return interpreter
end function

tui={}
tui.start_task_routine = function (taskName)
	print(theme.task.apply("|> ") + theme.text.apply(taskName))
end function
tui.end_task_routine = function ()
	print(theme.task.apply(" > ") + theme.text.set_bold(true).apply("Done."))
end function
tui.input_cmd = function ()
	input = user_input()
	tokenizer = ushScript.tokenizer()
	tokens = tokenizer.tokenize_str(input)
	print(tokens)
	print("")
end function

ABOUT_TAB_SIZE=8
ABOUT = "\n\n"+" "*ABOUT_TAB_SIZE+
		style().set_color("orange").set_bold(true).
			apply("USHELL v"+USHELL_VERSION_STRING)+
		" "+
		theme.text().set_italic(true).
			apply("developed by ZHK") +
		"\n"+" "*ABOUT_TAB_SIZE+
		style().set_color("yellow").set_italic(true).apply("No warranty provided. Use at your own risk.")+
		"\n\n"
ABOUT + ABOUT.s

clear_screen()
tui.start_task_routine("Loading USHELL...")
//tui.start_task_routine("Attempting to find the config file...")
//tui.start_task_routine("Config file not found. Using the default...")
tui.end_task_routine()

wait(0.5)

clear_screen()
print(ABOUT)

sstream = boost.stream.array_stream("HELLO, WORLD!".s)

n = sstream.next
while n != null
	print(n)
	n = sstream.next(1)
end while

// while true
// 	tui.input_cmd()
// end while
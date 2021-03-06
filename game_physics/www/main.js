var $R = [
	"Method %s in class %s threw exception [%s]",
	"Procedure %s threw exception [%s]",
	"Internal tag-object is null error",
	"Failed to create internal tag-object",
	"Invalid tag handle error",
	"Invalid attribute-name error",
	"Invalid property-name error",
	"Invalid style-name error",
	"Failed to attach element to owner",
	"Owner tag-object is NIL error",
	"invalid owner handle error",
	"Invalid component registration",
	"Failed to create attribute storage object, invalid handle error",
	"Failed to read attribute field, browser threw exception: %s",
	"Failed to write attribute field, browser threw exception: %s",
	"invalid owner handle error",
	"Failed to initialize from graphics-context: ",
	"Read failed, invalid offset [%d], expected %d..%d"];
function Trim$_String_Integer_Integer_(s,a,b) { if (a<0) a=0; if (b<0) b=0; return s.substr(a,s.length-a-b) };
function Trim$_String_(s) { return s.replace(/^\s\s*/, "").replace(/\s\s*$/, "") };
var TObject={
	$ClassName: "TObject",
	$Parent: null,
	ClassName: function (s) { return s.$ClassName },
	ClassType: function (s) { return s },
	ClassParent: function (s) { return s.$Parent },
	$Init: function () {},
	Create: function (s) { return s },
	Destroy: function (s) { for (var prop in s) if (s.hasOwnProperty(prop)) delete s.prop },
	Destroy$: function(s) { return s.ClassType.Destroy(s) },
	Free: function (s) { if (s!==null) s.ClassType.Destroy(s) }
};
function SameText(a,b) { return a.toUpperCase()==b.toUpperCase() };
function Randomize() { Random = $alea() };
function RandomInt(i) { return Math.floor(Random()*i) };
/*

Copyright (C) 2010 by Johannes Baag�e <baagoe@baagoe.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

From http://baagoe.com/en/RandomMusings/javascript/
*/
function $alea() {
  return (function(args) {
    // Johannes Baagøe <baagoe@baagoe.com>, 2010
    var s0 = 0;
    var s1 = 0;
    var s2 = 0;
    var c = 1;

    if (args.length == 0) {
      args = [+new Date];
    }
    var mash = function() {
       var n = 0xefc8249d;
    
       var mash = function(data) {
         data = data.toString();
         for (var i = 0; i < data.length; i++) {
           n += data.charCodeAt(i);
           var h = 0.02519603282416938 * n;
           n = h >>> 0;
           h -= n;
           h *= n;
           n = h >>> 0;
           h -= n;
           n += h * 0x100000000; // 2^32
         }
         return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
       };
    
       //mash.version = 'Mash 0.9';
       return mash;
    }();
    s0 = mash(' ');
    s1 = mash(' ');
    s2 = mash(' ');

    for (var i = 0; i < args.length; i++) {
      s0 -= mash(args[i]);
      if (s0 < 0) {
        s0 += 1;
      }
      s1 -= mash(args[i]);
      if (s1 < 0) {
        s1 += 1;
      }
      s2 -= mash(args[i]);
      if (s2 < 0) {
        s2 += 1;
      }
    }
    mash = null;

    var random = function() {
      var t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32
      s0 = s1;
      s1 = s2;
      return s2 = t - (c = t | 0);
    };
    /*random.uint32 = function() {
      return random() * 0x100000000; // 2^32
    };
    random.fract53 = function() {
      return random() +
        (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
    };*/
    //random.version = 'Alea 0.9';
    random.args = args;
    return random;

  } (Array.prototype.slice.call(arguments)));
};var Random = $alea();
function IntToHex2(v) { var r=v.toString(16); return (r.length==1)?"0"+r:r };
/**
sprintf() for JavaScript 0.7-beta1
http://www.diveintojavascript.com/projects/javascript-sprintf

Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of sprintf() for JavaScript nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL Alexandru Marasteanu BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
**/

var sprintf = (function() {
	function get_type(variable) {
		return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
	}
	function str_repeat(input, multiplier) {
		for (var output = []; multiplier > 0; output[--multiplier] = input) {/* do nothing */}
		return output.join('');
	}

	var str_format = function() {
		if (!str_format.cache.hasOwnProperty(arguments[0])) {
			str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
		}
		return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
	};

	str_format.format = function(parse_tree, argv) {
		var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
		for (i = 0; i < tree_length; i++) {
			node_type = get_type(parse_tree[i]);
			if (node_type === 'string') {
				output.push(parse_tree[i]);
			}
			else if (node_type === 'array') {
				match = parse_tree[i]; // convenience purposes only
				if (match[2]) { // keyword argument
					arg = argv[cursor];
					for (k = 0; k < match[2].length; k++) {
						if (!arg.hasOwnProperty(match[2][k])) {
							throw(sprintf('[sprintf] property "%s" does not exist', match[2][k]));
						}
						arg = arg[match[2][k]];
					}
				}
				else if (match[1]) { // positional argument (explicit)
					arg = argv[match[1]];
				}
				else { // positional argument (implicit)
					arg = argv[cursor++];
				}

				if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
					throw(sprintf('[sprintf] expecting number but found %s', get_type(arg)));
				}
				switch (match[8]) {
					case 'b': arg = arg.toString(2); break;
					case 'c': arg = String.fromCharCode(arg); break;
					case 'd': arg = String(parseInt(arg, 10)); if (match[7]) { arg = str_repeat('0', match[7]-arg.length)+arg } break;
					case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
					case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
					case 'o': arg = arg.toString(8); break;
					case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
					case 'u': arg = Math.abs(arg); break;
					case 'x': arg = arg.toString(16); break;
					case 'X': arg = arg.toString(16).toUpperCase(); break;
				}
				arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
				pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
				pad_length = match[6] - String(arg).length;
				pad = match[6] ? str_repeat(pad_character, pad_length) : '';
				output.push(match[5] ? arg + pad : pad + arg);
			}
		}
		return output.join('');
	};

	str_format.cache = {};

	str_format.parse = function(fmt) {
		var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
		while (_fmt) {
			if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
				parse_tree.push(match[0]);
			}
			else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
				parse_tree.push('%');
			}
			else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
				if (match[2]) {
					arg_names |= 1;
					var field_list = [], replacement_field = match[2], field_match = [];
					if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
						field_list.push(field_match[1]);
						while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
							if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
								field_list.push(field_match[1]);
							}
							else {
								throw('[sprintf] huh?');
							}
						}
					}
					else {
						throw('[sprintf] huh?');
					}
					match[2] = field_list;
				}
				else {
					arg_names |= 2;
				}
				if (arg_names === 3) {
					throw('[sprintf] mixing positional and named placeholders is not (yet) supported');
				}
				parse_tree.push(match);
			}
			else {
				throw('[sprintf] huh?');
			}
			_fmt = _fmt.substring(match[0].length);
		}
		return parse_tree;
	};

	return str_format;
})();
function Format(f,a) { a.unshift(f); return sprintf.apply(null,a) };
;
;
function FloatToStr$_Float_(i) { return i.toString() }
function FloatToStr$_Float_Integer_(i,p) { return (p==99)?i.toString():i.toFixed(p) };
var Exception={
	$ClassName: "Exception",
	$Parent: TObject,
	$Init: function () { FMessage="" },
	Create: function (s,Msg) { s.FMessage=Msg; return s }
};
var EAssertionFailed={
	$ClassName: "EAssertionFailed",
	$Parent: Exception,
	$Init: Exception.$Init
};
function Delete(s,i,n) { var v=s.v; if ((i<=0)||(i>v.length)||(n<=0)) return; s.v=v.substr(0,i-1)+v.substr(i+n-1); };
function ClampInt(v,mi,ma) { return v<mi ? mi : v>ma ? ma : v };
function $W(e) { return e.ClassType?e:Exception.Create($New(Exception),e.constructor.name+", "+e.message) };
function $NewDyn(c,z) {
	if (c==null) throw Exception.Create($New(Exception),"ClassType is nil"+z);
	var i={ClassType:c};
	c.$Init(i);
	return i
};
function $New(c) { var i={ClassType:c}; c.$Init(i); return i };
function $Is(o,c) {
	if (o===null) return false;
	return $Inh(o.ClassType,c);
}
;
function $Inh(s,c) {
	if (s===null) return false;
	while ((s)&&(s!==c)) s=s.$Parent;
	return (s)?true:false;
}
;
function $Event1(i,f) {
	var li=i,lf=f;
	return function(a) {
		return lf.call(li,li,a)
	}
};
function $Event0(i,f) {
	var li=i,lf=f;
	return function() {
		return lf.call(li,li)
	}
};
function $Div(a,b) { var r=a/b; return (r>=0)?Math.floor(r):Math.ceil(r) };
function $Assert(b,m,z) { if (!b) throw Exception.Create($New(EAssertionFailed),"Assertion failed"+z+((m=="")?"":" : ")+m); };
function $AsIntf(o,i) {
	if (o===null) return null;
	var r = o.ClassType.$Intf[i].map(function (e) {
		return function () {
			var arg=Array.prototype.slice.call(arguments);
			arg.splice(0,0,o);
			return e.apply(o, arg);
		}
	});
	r.O = o;
	return r;
}
;
function $AsClass(s,c) {
	if ((s===null)||$Inh(s,c)) return s;
	throw Exception.Create($New(Exception),"Cannot cast class \""+s.$ClassName+"\" to class \""+c.$ClassName+"\"");
};
function $As(o,c) {
	if ((o===null)||$Is(o,c)) return o;
	throw Exception.Create($New(Exception),"Cannot cast instance of type \""+o.ClassType.$ClassName+"\" to class \""+c.$ClassName+"\"");
};
function $ArraySwap(a,i1,i2) { var t=a[i1]; a[i1]=a[i2]; a[i2]=t };
/// TW3CustomApplication = class (TObject)
///  [line: 216, column: 3, file: SmartCL.Application]
var TW3CustomApplication = {
   $ClassName:"TW3CustomApplication",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FBody = $.FCurrentForm = $.FDisplay = $.FEnterAnim = $.FLeaveAnim = $.FMainForm = $.FOnBeforeUnload = $.FOnUnload = $.FTransDst = $.FTransSrc = null;
      $.FEntryEffect = 0;
      $.FFormChangeActive = $.FTerminated = false;
      $.FForms = [];
   }
   /// procedure TW3CustomApplication.AdjustScreen()
   ///  [line: 757, column: 32, file: SmartCL.Application]
   ,AdjustScreen:function(Self) {
      TW3ScrollInfo.ScrollTo(TW3CustomControl.GetScrollInfo(Self.FDisplay),0,0);
      TW3MovableControl.SetBounds$2(Self.FDisplay,0,0,TDocumentBody.GetWidth$5(Self.FBody),TDocumentBody.GetHeight$5(Self.FBody));
   }
   /// procedure TW3CustomApplication.ApplicationClosing()
   ///  [line: 792, column: 32, file: SmartCL.Application]
   ,ApplicationClosing:function(Self) {
      /* null */
   }
   /// procedure TW3CustomApplication.ApplicationStarted()
   ///  [line: 782, column: 32, file: SmartCL.Application]
   ,ApplicationStarted:function(Self) {
      /* null */
   }
   /// procedure TW3CustomApplication.ApplicationStarting()
   ///  [line: 787, column: 32, file: SmartCL.Application]
   ,ApplicationStarting:function(Self) {
      TW3CustomApplication.AdjustScreen(Self);
   }
   /// procedure TW3CustomApplication.CBOnBeforeUnload()
   ///  [line: 709, column: 32, file: SmartCL.Application]
   ,CBOnBeforeUnload:function(Self) {
      if (Self.FOnBeforeUnload) {
         Self.FOnBeforeUnload(Self);
      }
   }
   /// procedure TW3CustomApplication.CBOnOrientationChange()
   ///  [line: 731, column: 32, file: SmartCL.Application]
   ,CBOnOrientationChange:function(Self) {
      var mOrientation = 0;
      var mTemp$1 = 0;
      var mEntry = null;
      mTemp$1 = parseInt(window.orientation,10);
      switch (mTemp$1) {
         case 0 :
            mOrientation = 0;
            break;
         case 90 :
            mOrientation = 1;
            break;
         case (-90) :
            mOrientation = 2;
            break;
         case 180 :
            mOrientation = 3;
            break;
      }
      try {
         if (Self.FDisplay) {
            mEntry = Self.FDisplay.FOnOrient;
            if (mEntry) {
               mEntry(Self.FDisplay,mOrientation,mTemp$1);
            }
         }
      } finally {
         TW3CustomApplication.AdjustScreen(Self);
      }
   }
   /// procedure TW3CustomApplication.CBOnReSize()
   ///  [line: 726, column: 32, file: SmartCL.Application]
   ,CBOnReSize:function(Self) {
      TW3CustomApplication.AdjustScreen(Self);
   }
   /// procedure TW3CustomApplication.CBOnUnLoad()
   ///  [line: 715, column: 32, file: SmartCL.Application]
   ,CBOnUnLoad:function(Self) {
      try {
         if (Self.FOnUnload) {
            Self.FOnUnload(Self);
         }
      } finally {
         if (!Self.FTerminated) {
            TW3CustomApplication.Terminate(Self);
         }
      }
   }
   /// constructor TW3CustomApplication.Create()
   ///  [line: 487, column: 34, file: SmartCL.Application]
   ,Create$17:function(Self) {
      TObject.Create(Self);
      Self.FBody = TW3Component.Create$19$($New(TDocumentBody),null);
      Self.FDisplay = TW3Component.Create$19$($New(TW3Display),Self.FBody);
      if (!Instance) {
         Instance = Self;
      }
      return Self
   }
   /// destructor TW3CustomApplication.Destroy()
   ///  [line: 498, column: 33, file: SmartCL.Application]
   ,Destroy:function(Self) {
      if (!Self.FTerminated) {
         TW3CustomApplication.Terminate(Self);
      }
      TObject.Free(Self.FDisplay);
      TObject.Free(Self.FBody);
      Instance = null;
      TObject.Destroy(Self);
   }
   /// procedure TW3CustomApplication.GotoFormByRef(aForm: TW3CustomForm; Effect: TFormEntryEffect = 0)
   ///  [line: 962, column: 32, file: SmartCL.Application]
   ,GotoFormByRef:function(Self, aForm, Effect) {
      var mIndex = 0;
      if (Self.FTerminated) {
         return;
      }
      if (Self.FFormChangeActive) {
         throw EW3Exception.CreateFmt($New(EW3Application),$R[0],["TW3CustomApplication.GotoFormByRef", TObject.ClassName(Self.ClassType), "A form transition is already active error"]);
      }
      if (aForm===null) {
         throw EW3Exception.CreateFmt($New(EW3Application),$R[0],["TW3CustomApplication.GotoFormByRef", TObject.ClassName(Self.ClassType), "Form parameter is NIL error"]);
      }
      mIndex = Self.FForms.indexOf(aForm);
      if (mIndex<0) {
         throw EW3Exception.CreateFmt($New(EW3Application),$R[0],["TW3CustomApplication.GotoFormByRef", TObject.ClassName(Self.ClassType), "Form not registered error"]);
      }
      if (aForm===Self.FCurrentForm) {
         return;
      }
      if (Self.FCurrentForm===null) {
         Self.FCurrentForm = aForm;
         TW3Display.PositionFormInView(Self.FDisplay,aForm);
         TW3MovableControl.SetVisible(aForm,true);
         TW3CustomForm.FormActivated(aForm);
         return;
      }
      if (!Effect) {
         TW3CustomForm.FormDeactivated(Self.FCurrentForm);
         TW3MovableControl.SetVisible(Self.FCurrentForm,false);
         TW3MovableControl.SetVisible(aForm,true);
         TW3Display.PositionFormInView(Self.FDisplay,aForm);
         TW3CustomForm.FormActivated(aForm);
         Self.FCurrentForm = aForm;
         return;
      }
      Self.FFormChangeActive = true;
      Self.FEntryEffect = Effect;
      TW3CustomControl.BringToFront(aForm);
      TW3CustomForm.FormDeactivated(Self.FCurrentForm);
      Self.FTransSrc = Self.FCurrentForm;
      Self.FTransDst = aForm;
      TW3MovableControl.SetVisible(aForm,true);
      TW3Display.PositionFormInView(Self.FDisplay,aForm);
      if ((Self.FEnterAnim===null)||(Self.FLeaveAnim===null)) {
         Self.FEnterAnim = TW3CustomAnimation.Create$59$($New(TW3NamedAnimation));
         TW3CustomAnimation.SetDuration(Self.FEnterAnim,0.3);
         Self.FLeaveAnim = TW3CustomAnimation.Create$59$($New(TW3NamedAnimation));
         TW3CustomAnimation.SetDuration(Self.FLeaveAnim,0.3);
      }
      switch (Effect) {
         case 1 :
            Self.FEnterAnim.FName$2 = "MOVE-LEFT";
            Self.FLeaveAnim.FName$2 = "MOVE-OUT-LEFT";
            break;
         case 2 :
            Self.FEnterAnim.FName$2 = "MOVE-RIGHT";
            Self.FLeaveAnim.FName$2 = "MOVE-OUT-RIGHT";
            break;
      }
      TW3CustomAnimation.ExecuteEx(Self.FEnterAnim,aForm,null,$Event1(Self,TW3CustomApplication.HandleEnterAnimEnds));
      TW3CustomAnimation.ExecuteEx(Self.FLeaveAnim,Self.FCurrentForm,null,$Event1(Self,TW3CustomApplication.HandleLeaveAnimEnds));
   }
   /// procedure TW3CustomApplication.HandleEnterAnimEnds(Sender: TObject)
   ///  [line: 923, column: 32, file: SmartCL.Application]
   ,HandleEnterAnimEnds:function(Self, Sender) {
      var mAnim = null;
      mAnim = $As(Sender,TW3NamedAnimation);
      switch (Self.FEntryEffect) {
         case 1 :
            TW3MovableControl.MoveTo(Self.FTransDst,0,0);
            Self.FCurrentForm = Self.FTransDst;
            TW3CustomForm.FormActivated(Self.FCurrentForm);
            Self.FFormChangeActive = false;
            break;
         case 2 :
            TW3MovableControl.MoveTo(Self.FTransDst,0,0);
            Self.FCurrentForm = Self.FTransDst;
            TW3CustomForm.FormActivated(Self.FCurrentForm);
            TW3MovableControl.SetVisible(Self.FTransSrc,false);
            TW3Display.PositionFormInView(Self.FDisplay,Self.FTransSrc);
            Self.FFormChangeActive = false;
            break;
      }
      TObject.Free(mAnim);
      mAnim = null;
   }
   /// procedure TW3CustomApplication.HandleLeaveAnimEnds(Sender: TObject)
   ///  [line: 914, column: 32, file: SmartCL.Application]
   ,HandleLeaveAnimEnds:function(Self, Sender$1) {
      var mAnim$1 = null;
      mAnim$1 = $As(Sender$1,TW3NamedAnimation);
      TW3MovableControl.SetVisible(Self.FTransSrc,false);
      TObject.Free(mAnim$1);
   }
   /// procedure TW3CustomApplication.HookWindowEvents()
   ///  [line: 520, column: 32, file: SmartCL.Application]
   ,HookWindowEvents:function(Self) {
      w3_bind2(document.body,"onunload",$Event0(Self,TW3CustomApplication.CBOnUnLoad));
      w3_bind2(document.body,"onbeforeunload",$Event0(Self,TW3CustomApplication.CBOnBeforeUnload));
      w3_bind2(window,"onresize",$Event0(Self,TW3CustomApplication.CBOnReSize));
      w3_bind2(window,"onorientationchange",$Event0(Self,TW3CustomApplication.CBOnOrientationChange));
   }
   /// procedure TW3CustomApplication.RegisterFormInstance(aForm: TW3CustomForm; isMainForm: Boolean = False)
   ///  [line: 829, column: 32, file: SmartCL.Application]
   ,RegisterFormInstance:function(Self, aForm$1, isMainForm) {
      if (Self.FTerminated) {
         return;
      }
      if (aForm$1) {
         if (Self.FForms.indexOf(aForm$1)<0) {
            try {
               Self.FForms.push(aForm$1);
            } catch ($e) {
               var e = $W($e);
               throw EW3Exception.CreateFmt($New(EW3Exception),$R[0],["TW3CustomApplication.RegisterFormInstance", TObject.ClassName(Self.ClassType), e.FMessage]);
            }
            w3_RequestAnimationFrame(function () {
               TW3MovableControl.AdjustToParentBox(aForm$1);
            });
            if (isMainForm) {
               Self.FMainForm = aForm$1;
            } else {
               TW3MovableControl.SetVisible(aForm$1,false);
            }
         } else {
            throw EW3Exception.CreateFmt($New(EW3Application),$R[0],["TW3CustomApplication.RegisterFormInstance", TObject.ClassName(Self.ClassType), "Form already registered"]);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3Application),$R[0],["TW3CustomApplication.RegisterFormInstance", TObject.ClassName(Self.ClassType), "Form parameter is NIL error"]);
      }
   }
   /// procedure TW3CustomApplication.RunApp()
   ///  [line: 797, column: 32, file: SmartCL.Application]
   ,RunApp:function(Self) {
      var FTemp = null;
      TW3CustomApplication.HookWindowEvents(Self);
      TW3CustomApplication.ApplicationStarting(Self);
      TApplicationFormsList.AutoCreateForms(FormsFactory(),Self.FDisplay.FView);
      if (Self.FMainForm) {
         FTemp = Self.FMainForm;
         Self.FMainForm = null;
         TW3CustomApplication.GotoFormByRef(Self,FTemp,0);
      }
      TW3CustomApplication.ApplicationStarted(Self);
   }
   /// procedure TW3CustomApplication.Terminate()
   ///  [line: 763, column: 32, file: SmartCL.Application]
   ,Terminate:function(Self) {
      var x$1 = 0;
      if (Self.FTerminated) {
         return;
      }
      Self.FTerminated = true;
      TW3CustomApplication.ApplicationClosing(Self);
      try {
         var $temp1;
         for(x$1 = 0,$temp1 = Self.FForms.length;x$1<$temp1;x$1++) {
            TObject.Free(Self.FForms[x$1]);
            Self.FForms[x$1]=null;
         }
         Self.FForms.length=0;
      } finally {
         TObject.Free(Self);
      }
   }
   /// procedure TW3CustomApplication.UnRegisterFormInstance(aForm: TW3CustomForm)
   ///  [line: 871, column: 32, file: SmartCL.Application]
   ,UnRegisterFormInstance:function(Self, aForm$2) {
      var mIndex$1 = 0;
      if (!Self.FTerminated) {
         if (aForm$2) {
            mIndex$1 = Self.FForms.indexOf(aForm$2);
            if (mIndex$1>=0) {
               if (Self.FMainForm!==aForm$2) {
                  if (Self.FCurrentForm===aForm$2) {
                     TW3CustomApplication.GotoFormByRef(Self,Self.FMainForm,0);
                  }
                  Self.FForms.splice(mIndex$1,1)
                  ;
                  try {
                     TObject.Free(aForm$2);
                  } catch ($e) {
                     var e$1 = $W($e);
                     throw EW3Exception.CreateFmt($New(EW3Application),$R[0],["TW3CustomApplication.UnRegisterFormInstance", TObject.ClassName(Self.ClassType), e$1.FMessage]);
                  }
               } else {
                  throw EW3Exception.CreateFmt($New(EW3Application),$R[0],["TW3CustomApplication.UnRegisterFormInstance", TObject.ClassName(Self.ClassType), "Main form cannot be removed error"]);
               }
            } else {
               throw EW3Exception.CreateFmt($New(EW3Application),$R[0],["TW3CustomApplication.UnRegisterFormInstance", TObject.ClassName(Self.ClassType), "Form is not registered"]);
            }
         } else {
            throw EW3Exception.CreateFmt($New(EW3Application),$R[0],["TW3CustomApplication.UnRegisterFormInstance", TObject.ClassName(Self.ClassType), "Form parameter is NIL error"]);
         }
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
};
/// TApplication = class (TW3CustomApplication)
///  [line: 11, column: 3, file: Unit1]
var TApplication = {
   $ClassName:"TApplication",
   $Parent:TW3CustomApplication
   ,$Init:function ($) {
      TW3CustomApplication.$Init($);
   }
   ,Destroy:TW3CustomApplication.Destroy
};
/// TW3DisplayViewArangeType enumeration
///  [line: 36, column: 3, file: SmartCL.Application]
var TW3DisplayViewArangeType = [ "dvaSizeToView", "dvaVStack", "dvaHStack" ];
/// TW3TagObj = class (TObject)
///  [line: 159, column: 3, file: SmartCL.Components]
var TW3TagObj = {
   $ClassName:"TW3TagObj",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FAccess = null;
      $.FHandle = undefined;
      $.FObjReady = false;
      $.FOwner$1 = undefined;
      $.FTagId = "";
      $.FUpdating = 0;
   }
   /// procedure TW3TagObj.AfterUpdate()
   ///  [line: 1083, column: 21, file: SmartCL.Components]
   ,AfterUpdate:function(Self) {
      /* null */
   }
   /// procedure TW3TagObj.BeginUpdate()
   ///  [line: 1068, column: 21, file: SmartCL.Components]
   ,BeginUpdate:function(Self) {
      ++Self.FUpdating;
   }
   /// constructor TW3TagObj.Create()
   ///  [line: 993, column: 23, file: SmartCL.Components]
   ,Create$18:function(Self) {
      TObject.Create(Self);
      Self.FObjReady = false;
      try {
         Self.FTagId = TW3TagObj.MakeElementTagId$(Self);
         Self.FHandle = TW3TagObj.MakeElementTagObj$(Self);
      } catch ($e) {
         var e$2 = $W($e);
         EW3TagObj.RaiseCntErrMethod("TW3TagObj.Create",Self,e$2.FMessage)      }
      if (TVariant.AsObject(Self.FHandle)!==TVariant.AsObject(document.body)) {
         if (Self.FTagId.length>0) {
            w3_setAttrib(Self.FHandle,"id",Self.FTagId);
         }
      }
      TW3TagObj.StyleTagObject$(Self);
      TW3TagObj.BeginUpdate(Self);
      try {
         TW3TagObj.InitializeObject$(Self);
      } finally {
         TW3TagObj.EndUpdate(Self);
      }
      Self.FObjReady = true;
      return Self
   }
   /// destructor TW3TagObj.Destroy()
   ///  [line: 1028, column: 22, file: SmartCL.Components]
   ,Destroy:function(Self) {
      if (Self.FAccess) {
         TObject.Free(Self.FAccess);
      }
      if (Self.FHandle) {
         try {
            TW3TagObj.UnHookEvents(Self);
            if (Self.FOwner$1) {
               TW3TagObj.RemoveFrom(Self);
            }
         } finally {
            TW3TagObj.FinalizeObject$(Self);
            Self.FTagId = "";
            Self.FHandle = null;
         }
      }
      TObject.Destroy(Self);
   }
   /// procedure TW3TagObj.EndUpdate()
   ///  [line: 1073, column: 21, file: SmartCL.Components]
   ,EndUpdate:function(Self) {
      if (Self.FUpdating>0) {
         --Self.FUpdating;
         if (!Self.FUpdating) {
            TW3TagObj.AfterUpdate$(Self);
         }
      }
   }
   /// procedure TW3TagObj.FinalizeObject()
   ///  [line: 1139, column: 21, file: SmartCL.Components]
   ,FinalizeObject:function(Self) {
      /* null */
   }
   /// function TW3TagObj.GetInnerHTML() : String
   ///  [line: 1111, column: 20, file: SmartCL.Components]
   ,GetInnerHTML:function(Self) {
      var Result = "";
      if (Self.FHandle) {
         Result = ""+Self.FHandle.innerHTML;
      }
      return Result
   }
   /// function TW3TagObj.GetUpdating() : Boolean
   ///  [line: 1063, column: 20, file: SmartCL.Components]
   ,GetUpdating:function(Self) {
      return Self.FUpdating>0;
   }
   /// procedure TW3TagObj.InitializeObject()
   ///  [line: 1135, column: 21, file: SmartCL.Components]
   ,InitializeObject:function(Self) {
      /* null */
   }
   /// procedure TW3TagObj.InsertInto(const OwnerHandle: THandle)
   ///  [line: 1180, column: 21, file: SmartCL.Components]
   ,InsertInto:function(Self, OwnerHandle) {
      if (!OwnerHandle) {
         EW3TagObj.RaiseCntErrMethod("TW3TagObj.InsertInto",Self,$R[9]);
      }
      if (!Self.FHandle) {
         EW3TagObj.RaiseCntErrMethod("TW3TagObj.InsertInto",Self,$R[2]);
      }
      try {
         if (Self.FOwner$1) {
            TW3TagObj.RemoveFrom(Self);
         }
         w3_setElementParentByRef(Self.FHandle,OwnerHandle);
         Self.FOwner$1 = OwnerHandle;
      } catch ($e) {
         var e$3 = $W($e);
         EW3TagObj.RaiseCntErrMethod("TW3TagObj.InsertInto",Self,e$3.FMessage)      }
   }
   /// function TW3TagObj.MakeElementTagId() : String
   ///  [line: 1165, column: 20, file: SmartCL.Components]
   ,MakeElementTagId:function(Self) {
      return w3_GetUniqueObjId();
   }
   /// function TW3TagObj.MakeElementTagObj() : THandle
   ///  [line: 1170, column: 20, file: SmartCL.Components]
   ,MakeElementTagObj:function(Self) {
      return w3_createHtmlElement("div");
   }
   /// procedure TW3TagObj.RemoveFrom()
   ///  [line: 1203, column: 21, file: SmartCL.Components]
   ,RemoveFrom:function(Self) {
      if (!Self.FOwner$1) {
         EW3TagObj.RaiseCntErrMethod("TW3TagObj.RemoveFrom",Self,$R[9]);
      }
      if (!Self.FHandle) {
         EW3TagObj.RaiseCntErrMethod("TW3TagObj.RemoveFrom",Self,$R[2]);
      }
      try {
         w3_RemoveElementByRef(Self.FHandle,Self.FOwner$1);
         Self.FOwner$1 = undefined;
      } catch ($e) {
         var e$4 = $W($e);
         EW3TagObj.RaiseCntErrMethod("TW3TagObj.RemoveFrom",Self,e$4.FMessage)      }
   }
   /// procedure TW3TagObj.SetInnerHTML(aValue: String)
   ///  [line: 1117, column: 21, file: SmartCL.Components]
   ,SetInnerHTML:function(Self, aValue) {
      if (Self.FHandle) {
         Self.FHandle.innerHTML = aValue;
      }
   }
   /// procedure TW3TagObj.StyleTagObject()
   ///  [line: 1143, column: 21, file: SmartCL.Components]
   ,StyleTagObject:function(Self) {
      if (Self.FHandle) {
         Self.FHandle.style["visibility"] = "hidden";
         Self.FHandle.style["display"] = "none";
         Self.FHandle.style["position"] = "absolute";
         Self.FHandle.style["overflow"] = "hidden";
         Self.FHandle.style["left"] = "0px";
         Self.FHandle.style["top"] = "0px";
      }
   }
   /// procedure TW3TagObj.UnHookEvents()
   ///  [line: 1087, column: 21, file: SmartCL.Components]
   ,UnHookEvents:function(Self) {
      if (Self.FHandle) {
         Self.FHandle.onresize = null;
         Self.FHandle.onselectstart = null;
         Self.FHandle.onfocus = null;
         Self.FHandle.onblur = null;
         Self.FHandle.onchange = null;
         Self.FHandle.onmousedown = null;
         Self.FHandle.onmouseup = null;
         Self.FHandle.onmousemove = null;
         Self.FHandle.onmouseover = null;
         Self.FHandle.onmouseout = null;
         Self.FHandle.onclick = null;
         Self.FHandle.ondblclick = null;
         Self.FHandle.onkeydown = null;
         Self.FHandle.onkeyup = null;
         Self.FHandle.onkeypress = null;
         Self.FHandle.webkitAnimationStart = null;
         Self.FHandle.webkitAnimationEnd = null;
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AfterUpdate$:function($){return $.ClassType.AfterUpdate($)}
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId$:function($){return $.ClassType.MakeElementTagId($)}
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
};
/// TW3Component = class (TW3TagObj)
///  [line: 209, column: 3, file: SmartCL.Components]
var TW3Component = {
   $ClassName:"TW3Component",
   $Parent:TW3TagObj
   ,$Init:function ($) {
      TW3TagObj.$Init($);
      $.FChildren = [];
      $.FName = "";
      $.FParent = null;
   }
   /// procedure TW3Component.CBNoBehavior()
   ///  [line: 1241, column: 24, file: SmartCL.Components]
   ,CBNoBehavior:function(Self) {
      if (event) {
         event.preventDefault();
      }
   }
   /// procedure TW3Component.ChildAdded(aChild: TW3Component)
   ///  [line: 1349, column: 24, file: SmartCL.Components]
   ,ChildAdded:function(Self, aChild) {
      /* null */
   }
   /// function TW3Component.ChildByHandle(const aHandle: THandle) : TW3Component
   ///  [line: 1258, column: 23, file: SmartCL.Components]
   ,ChildByHandle:function(Self, aHandle) {
      var Result = null;
      var x$2 = 0;
      var mObj$1 = null;
      Result = null;
      var $temp2;
      for(x$2 = 0,$temp2 = TW3Component.GetChildCount(Self);x$2<$temp2;x$2++) {
         mObj$1 = TW3Component.GetChildObject(Self,x$2);
         if (mObj$1.FHandle==aHandle) {
            Result = mObj$1;
            break;
         }
      }
      return Result
   }
   /// function TW3Component.ChildByName(const compName: String) : TW3Component
   ///  [line: 1247, column: 23, file: SmartCL.Components]
   ,ChildByName:function(Self, compName) {
      var Result = null;
      var lcName = "";
      var i = 0;
      lcName = (Trim$_String_(compName)).toLowerCase();
      var $temp3;
      for(i = 0,$temp3 = TW3Component.GetChildCount(Self);i<$temp3;i++) {
         Result = TW3Component.GetChildObject(Self,i);
         if ((Result.FName).toLowerCase()==lcName) {
            return Result;
         }
      }
      Result = null;
      return Result
   }
   /// procedure TW3Component.ChildRemoved(aChild: TW3Component)
   ///  [line: 1353, column: 24, file: SmartCL.Components]
   ,ChildRemoved:function(Self, aChild$1) {
      /* null */
   }
   /// constructor TW3Component.Create(AOwner: TW3Component)
   ///  [line: 1227, column: 26, file: SmartCL.Components]
   ,Create$19:function(Self, AOwner) {
      Self.FParent = AOwner;
      TW3TagObj.Create$18(Self);
      if (Self.FParent!==null) {
         TW3Component.RegisterChild(Self.FParent,Self);
      }
      return Self
   }
   /// procedure TW3Component.FinalizeObject()
   ///  [line: 1293, column: 24, file: SmartCL.Components]
   ,FinalizeObject:function(Self) {
      TW3Component.FreeChildren(Self);
      if (Self.FParent!==null) {
         TW3Component.UnRegisterChild(Self.FParent,Self);
      }
      Self.FChildren.length=0;
      TW3TagObj.FinalizeObject(Self);
   }
   /// procedure TW3Component.FreeChildren()
   ///  [line: 1323, column: 24, file: SmartCL.Components]
   ,FreeChildren:function(Self) {
      var oldCount = 0;
      try {
         while (Self.FChildren.length>0) {
            oldCount = Self.FChildren.length;
            TObject.Free(Self.FChildren[0]);
            if (oldCount==Self.FChildren.length) {
               Self.FChildren.shift();
            }
         }
      } finally {
         Self.FChildren.length=0;
      }
   }
   /// function TW3Component.GetChildCount() : Integer
   ///  [line: 1308, column: 23, file: SmartCL.Components]
   ,GetChildCount:function(Self) {
      return Self.FChildren.length;
   }
   /// function TW3Component.GetChildObject(index: Integer) : TW3Component
   ///  [line: 1313, column: 23, file: SmartCL.Components]
   ,GetChildObject:function(Self, index) {
      return Self.FChildren[index];
   }
   /// procedure TW3Component.InitializeObject()
   ///  [line: 1288, column: 24, file: SmartCL.Components]
   ,InitializeObject:function(Self) {
      TW3TagObj.InitializeObject(Self);
   }
   /// procedure TW3Component.RegisterChild(aChild: TW3Component)
   ///  [line: 1357, column: 24, file: SmartCL.Components]
   ,RegisterChild:function(Self, aChild$2) {
      if ((aChild$2!==null)&&(Self.FChildren.indexOf(aChild$2)<0)) {
         Self.FChildren.push(aChild$2);
         TW3TagObj.InsertInto(aChild$2,Self.FHandle);
         TW3Component.ChildAdded(Self,aChild$2);
      }
   }
   /// procedure TW3Component.SetName(Value: String)
   ///  [line: 1318, column: 24, file: SmartCL.Components]
   ,SetName:function(Self, Value$4) {
      Self.FName = Value$4;
   }
   /// procedure TW3Component.UnRegisterChild(aChild: TW3Component)
   ///  [line: 1367, column: 24, file: SmartCL.Components]
   ,UnRegisterChild:function(Self, aChild$3) {
      var mIndex$2 = 0;
      if (aChild$3!==null) {
         mIndex$2 = Self.FChildren.indexOf(aChild$3);
         if (mIndex$2>=0) {
            Self.FChildren.splice(mIndex$2,1)
            ;
            TW3Component.ChildRemoved(Self,aChild$3);
         }
         TW3TagObj.RemoveFrom(aChild$3);
      }
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3TagObj.AfterUpdate
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,StyleTagObject:TW3TagObj.StyleTagObject
   ,Create$19$:function($){return $.ClassType.Create$19.apply($.ClassType, arguments)}
};
/// TW3MovableControl = class (TW3Component)
///  [line: 337, column: 3, file: SmartCL.Components]
var TW3MovableControl = {
   $ClassName:"TW3MovableControl",
   $Parent:TW3Component
   ,$Init:function ($) {
      TW3Component.$Init($);
      $.FAdjusted = $.FTransparent = $.FUseAlpha = $.FWasMoved = $.FWasSized = false;
      $.FAlpha = 0;
      $.FBackground = $.FBorders = $.FConstraints = null;
      $.FColor = 0;
   }
   /// procedure TW3MovableControl.AdjustToParentBox()
   ///  [line: 1773, column: 29, file: SmartCL.Components]
   ,AdjustToParentBox:function(Self) {
      var x$3 = 0;
      var dx = 0;
      var dy = 0;
      var mChild = null;
      var mCtrl = null;
      if (Self.FHandle) {
         if (!Self.FAdjusted) {
            Self.FAdjusted = true;
            dx = TW3Borders.GetHSpace(TW3MovableControl.GetBorder(Self));
            dy = TW3Borders.GetVSpace(TW3MovableControl.GetBorder(Self));
            var $temp4;
            for(x$3 = 0,$temp4 = TW3Component.GetChildCount(Self);x$3<$temp4;x$3++) {
               mChild = TW3Component.GetChildObject(Self,x$3);
               if ($Is(mChild,TW3MovableControl)) {
                  mCtrl = $As(mChild,TW3MovableControl);
                  if (TW3MovableControl.supportAdjustment$(mCtrl.ClassType)) {
                     if ((dx>0)||(dy>0)) {
                        TW3MovableControl.SetSize(mCtrl,TW3MovableControl.GetWidth$(mCtrl)-dx,TW3MovableControl.GetHeight$(mCtrl)-dy);
                     }
                     w3_RequestAnimationFrame(function () {
                        TW3MovableControl.AdjustToParentBox(mCtrl);
                     });
                  }
               }
            }
         }
      }
   }
   /// procedure TW3MovableControl.AfterUpdate()
   ///  [line: 1906, column: 29, file: SmartCL.Components]
   ,AfterUpdate:function(Self) {
      Self.FWasMoved = false;
      Self.FWasSized = false;
   }
   /// function TW3MovableControl.ClientHeight() : Integer
   ///  [line: 1822, column: 28, file: SmartCL.Components]
   ,ClientHeight:function(Self) {
      var Result = 0;
      if (Self.FHandle) {
         if (VarIsValidRef(Self.FHandle.clientHeight)) {
            Result = TVariant.AsInteger(Self.FHandle.clientHeight);
            if (isNaN(Result)||(Result==0)) {
               Result = TW3MovableControl.GetWidth$(Self);
            }
         } else {
            Result = TW3MovableControl.GetWidth$(Self);
         }
      }
      return Result
   }
   /// function TW3MovableControl.ClientToScreen(pt: TPoint) : TPoint
   ///  [line: 1864, column: 28, file: SmartCL.Components]
   ,ClientToScreen:function(Self, pt) {
      var Result = {X$1:0,Y$1:0};
      var sr = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
      sr = TW3MovableControl.ScreenRect(Self);
      Result.X$1 = pt.X$1+sr.Left$1;
      Result.Y$1 = pt.Y$1+sr.Top$1;
      return Result
   }
   /// function TW3MovableControl.ClientWidth() : Integer
   ///  [line: 1809, column: 28, file: SmartCL.Components]
   ,ClientWidth:function(Self) {
      var Result = 0;
      if (Self.FHandle) {
         if (VarIsValidRef(Self.FHandle.clientWidth)) {
            Result = TVariant.AsInteger(Self.FHandle.clientWidth);
            if (isNaN(Result)||(Result==0)) {
               Result = TW3MovableControl.GetWidth$(Self);
            }
         } else {
            Result = TW3MovableControl.GetWidth$(Self);
         }
      }
      return Result
   }
   /// function TW3MovableControl.ControlAtPoint(x: Integer; y: Integer; const Recursive: Boolean) : TW3Component
   ///  [line: 1713, column: 28, file: SmartCL.Components]
   ,ControlAtPoint:function(Self, x$4, y, Recursive) {
      var Result = null;
      var mPos = {X$1:0,Y$1:0};
      var mTarget = undefined;
      var mIndex$3 = 0;
      var mControl = null;
      Result = null;
      mPos = TW3MovableControl.ClientToScreen(Self,Create$13(x$4,y));
      mTarget = document.elementFromPoint(mPos.X$1,mPos.Y$1);
      if (mTarget) {
         Result = TW3Component.ChildByHandle(Self,mTarget);
         if (Result===null) {
            var $temp5;
            for(mIndex$3 = 0,$temp5 = TW3Component.GetChildCount(Self);mIndex$3<$temp5;mIndex$3++) {
               mControl = TW3Component.GetChildObject(Self,mIndex$3);
               Result = TW3Component.ChildByHandle(mControl,mTarget);
               if (Result!==null) {
                  break;
               }
            }
         }
      }
      return Result
   }
   /// function TW3MovableControl.DisplayMode() : String
   ///  [line: 1927, column: 34, file: SmartCL.Components]
   ,DisplayMode:function(Self) {
      return "inline-block";
   }
   /// procedure TW3MovableControl.FinalizeObject()
   ///  [line: 1878, column: 29, file: SmartCL.Components]
   ,FinalizeObject:function(Self) {
      if (Self.FBackground) {
         TObject.Free(Self.FBackground);
      }
      if (Self.FBorders) {
         TObject.Free(Self.FBorders);
      }
      if (Self.FConstraints) {
         TObject.Free(Self.FConstraints);
      }
      TW3Component.FinalizeObject(Self);
   }
   /// function TW3MovableControl.GetBackGround() : TW3ControlBackground
   ///  [line: 1912, column: 28, file: SmartCL.Components]
   ,GetBackGround:function(Self) {
      var Result = null;
      if (Self.FBackground===null) {
         Self.FBackground = TW3OwnedObject.Create$4$($New(TW3ControlBackground),Self);
      }
      Result = Self.FBackground;
      return Result
   }
   /// function TW3MovableControl.GetBorder() : TW3Borders
   ///  [line: 1899, column: 28, file: SmartCL.Components]
   ,GetBorder:function(Self) {
      var Result = null;
      if (Self.FBorders===null) {
         Self.FBorders = TW3OwnedObject.Create$4$($New(TW3Borders),Self);
      }
      Result = Self.FBorders;
      return Result
   }
   /// function TW3MovableControl.GetBoundsRect() : TRect
   ///  [line: 1950, column: 28, file: SmartCL.Components]
   ,GetBoundsRect:function(Self) {
      var Result = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
      Result.Left$1 = TW3MovableControl.GetLeft(Self);
      Result.Top$1 = TW3MovableControl.GetTop(Self);
      Result.Right$1 = Result.Left$1+TW3MovableControl.GetWidth$(Self);
      Result.Bottom$1 = Result.Top$1+TW3MovableControl.GetHeight$(Self);
      return Result
   }
   /// function TW3MovableControl.GetHeight() : Integer
   ///  [line: 2002, column: 28, file: SmartCL.Components]
   ,GetHeight:function(Self) {
      var Result = 0;
      if (Self.FHandle) {
         Result = parseInt(Self.FHandle.offsetHeight,10);
      }
      return Result
   }
   /// function TW3MovableControl.GetLeft() : Integer
   ///  [line: 1958, column: 28, file: SmartCL.Components]
   ,GetLeft:function(Self) {
      return w3_getStyleAsInt(Self.FHandle,"left");
   }
   /// function TW3MovableControl.GetTop() : Integer
   ///  [line: 1971, column: 28, file: SmartCL.Components]
   ,GetTop:function(Self) {
      return w3_getStyleAsInt(Self.FHandle,"top");
   }
   /// function TW3MovableControl.GetVisible() : Boolean
   ///  [line: 1919, column: 28, file: SmartCL.Components]
   ,GetVisible:function(Self) {
      var Result = false;
      var mValue$2 = "";
      mValue$2 = w3_getStyleAsStr(Self.FHandle,"visibility");
      Result = (mValue$2).toLowerCase()=="visible";
      return Result
   }
   /// function TW3MovableControl.GetWasMoved() : Boolean
   ///  [line: 2020, column: 28, file: SmartCL.Components]
   ,GetWasMoved:function(Self) {
      return Self.FWasMoved;
   }
   /// function TW3MovableControl.GetWasSized() : Boolean
   ///  [line: 2025, column: 28, file: SmartCL.Components]
   ,GetWasSized:function(Self) {
      return Self.FWasSized;
   }
   /// function TW3MovableControl.GetWidth() : Integer
   ///  [line: 1984, column: 28, file: SmartCL.Components]
   ,GetWidth:function(Self) {
      var Result = 0;
      if (Self.FHandle) {
         Result = parseInt(Self.FHandle.offsetWidth,10);
      }
      return Result
   }
   /// procedure TW3MovableControl.InitializeObject()
   ///  [line: 1704, column: 29, file: SmartCL.Components]
   ,InitializeObject:function(Self) {
      TW3Component.InitializeObject(Self);
      Self.FAlpha = 255;
      Self.FColor = 536870911;
      Self.FTransparent = false;
   }
   /// procedure TW3MovableControl.MoveTo(aLeft: Integer; aTop: Integer)
   ///  [line: 2048, column: 29, file: SmartCL.Components]
   ,MoveTo:function(Self, aLeft, aTop) {
      TW3TagObj.BeginUpdate(Self);
      Self.FHandle.style["left"] = TInteger.ToPxStr(aLeft);
      Self.FHandle.style["top"] = TInteger.ToPxStr(aTop);
      TW3MovableControl.SetWasMoved(Self);
      TW3TagObj.EndUpdate(Self);
   }
   /// procedure TW3MovableControl.Resize()
   ///  [line: 2044, column: 29, file: SmartCL.Components]
   ,Resize:function(Self) {
      /* null */
   }
   /// function TW3MovableControl.ScreenRect() : TRect
   ///  [line: 1841, column: 28, file: SmartCL.Components]
   ,ScreenRect:function(Self) {
      var Result = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
      var elem = undefined;
      if (Self.FHandle) {
         elem = Self.FHandle;
         while (1) {
            Result.Left$1+=parseInt(elem.offsetLeft,10);
            Result.Top$1+=parseInt(elem.offsetTop,10);
            elem = elem.offsetParent;
            if (elem) {
               Result.Left$1-=parseInt(elem.scrollLeft,10);
               Result.Top$1-=parseInt(elem.scrollTop,10);
            } else {
               break;
            }
         }
         Result.Right$1 = parseInt((Result.Left$1+Self.FHandle.offsetWidth),10);
         Result.Bottom$1 = parseInt((Result.Top$1+Self.FHandle.offsetHeight),10);
      }
      return Result
   }
   /// procedure TW3MovableControl.SetAlpha(const aValue: Integer)
   ///  [line: 2114, column: 29, file: SmartCL.Components]
   ,SetAlpha:function(Self, aValue$1) {
      Self.FAlpha = ClampInt(aValue$1,0,255);
      if (Self.FUseAlpha) {
         Self.FHandle.style["opacity"] = Self.FAlpha*0.01;
      }
   }
   /// procedure TW3MovableControl.SetBounds(aLeft: Integer; aTop: Integer; aWidth: Integer; aHeight: Integer)
   ///  [line: 2057, column: 29, file: SmartCL.Components]
   ,SetBounds$2:function(Self, aLeft$1, aTop$1, aWidth, aHeight) {
      var mSized = false;
      var mMoved = false;
      aWidth = Math.max(0,aWidth);
      aHeight = Math.max(0,aHeight);
      mMoved = (aLeft$1!=TW3MovableControl.GetLeft(Self))||(aTop$1!=TW3MovableControl.GetTop(Self));
      mSized = (aWidth!=TW3MovableControl.GetWidth$(Self))||(aHeight!=TW3MovableControl.GetHeight$(Self));
      TW3TagObj.BeginUpdate(Self);
      Self.FHandle.style["left"] = TInteger.ToPxStr(aLeft$1);
      Self.FHandle.style["top"] = TInteger.ToPxStr(aTop$1);
      Self.FHandle.style["width"] = TInteger.ToPxStr(aWidth);
      Self.FHandle.style["height"] = TInteger.ToPxStr(aHeight);
      if (mMoved) {
         TW3MovableControl.SetWasMoved(Self);
      }
      if (mSized) {
         TW3MovableControl.SetWasSized(Self);
      }
      TW3TagObj.EndUpdate(Self);
   }
   /// procedure TW3MovableControl.SetColor(const aValue: TColor)
   ///  [line: 2139, column: 29, file: SmartCL.Components]
   ,SetColor:function(Self, aValue$2) {
      var mText = "";
      if (aValue$2!=Self.FColor) {
         Self.FColor = aValue$2;
         mText = ColorToWebStr(Self.FColor,(Self.FTransparent)?0:255);
         Self.FHandle.style["backgroundColor"] = mText;
      }
   }
   /// procedure TW3MovableControl.SetHeight(aValue: Integer)
   ///  [line: 2008, column: 29, file: SmartCL.Components]
   ,SetHeight:function(Self, aValue$3) {
      aValue$3 = Math.max(aValue$3,0);
      if (aValue$3!=TW3MovableControl.GetHeight$(Self)) {
         TW3TagObj.BeginUpdate(Self);
         Self.FHandle.style["height"] = TInteger.ToPxStr(aValue$3);
         TW3MovableControl.SetWasSized(Self);
         TW3TagObj.EndUpdate(Self);
      }
   }
   /// procedure TW3MovableControl.SetLeft(const aValue: Integer)
   ///  [line: 1963, column: 29, file: SmartCL.Components]
   ,SetLeft:function(Self, aValue$4) {
      TW3TagObj.BeginUpdate(Self);
      Self.FHandle.style["left"] = TInteger.ToPxStr(aValue$4);
      TW3MovableControl.SetWasMoved(Self);
      TW3TagObj.EndUpdate(Self);
   }
   /// procedure TW3MovableControl.SetSize(aWidth: Integer; aHeight: Integer)
   ///  [line: 2086, column: 29, file: SmartCL.Components]
   ,SetSize:function(Self, aWidth$1, aHeight$1) {
      aWidth$1 = Math.max(aWidth$1,0);
      aHeight$1 = Math.max(aHeight$1,0);
      if ((aWidth$1!=TW3MovableControl.GetWidth$(Self))||(aHeight$1!=TW3MovableControl.GetHeight$(Self))) {
         TW3TagObj.BeginUpdate(Self);
         Self.FHandle.style["width"] = TInteger.ToPxStr(aWidth$1);
         Self.FHandle.style["height"] = TInteger.ToPxStr(aHeight$1);
         TW3MovableControl.SetWasSized(Self);
         TW3TagObj.EndUpdate(Self);
      }
   }
   /// procedure TW3MovableControl.SetTop(const aValue: Integer)
   ///  [line: 1976, column: 29, file: SmartCL.Components]
   ,SetTop:function(Self, aValue$5) {
      TW3TagObj.BeginUpdate(Self);
      Self.FHandle.style["top"] = TInteger.ToPxStr(aValue$5);
      TW3MovableControl.SetWasMoved(Self);
      TW3TagObj.EndUpdate(Self);
   }
   /// procedure TW3MovableControl.SetTransparent(const aValue: Boolean)
   ///  [line: 2124, column: 29, file: SmartCL.Components]
   ,SetTransparent:function(Self, aValue$6) {
      var mText$1 = "";
      if (aValue$6!=Self.FTransparent) {
         TW3TagObj.BeginUpdate(Self);
         Self.FTransparent = aValue$6;
         mText$1 = ColorToWebStr(Self.FColor,(aValue$6)?0:255);
         Self.FHandle.style["backgroundColor"] = mText$1;
         TW3MovableControl.SetWasMoved(Self);
         TW3TagObj.EndUpdate(Self);
      }
   }
   /// procedure TW3MovableControl.SetUseAlpha(const aValue: Boolean)
   ///  [line: 2100, column: 29, file: SmartCL.Components]
   ,SetUseAlpha:function(Self, aValue$7) {
      var mBlend = 0;
      if (aValue$7==Self.FUseAlpha) {
         return;
      }
      Self.FUseAlpha = aValue$7;
      if (aValue$7) {
         mBlend = Self.FAlpha*0.01;
      } else {
         mBlend = 1;
      }
      Self.FHandle.style["opacity"] = mBlend;
   }
   /// procedure TW3MovableControl.SetVisible(const aValue: Boolean)
   ///  [line: 1932, column: 29, file: SmartCL.Components]
   ,SetVisible:function(Self, aValue$8) {
      TW3TagObj.BeginUpdate(Self);
      if (aValue$8) {
         Self.FHandle.style["display"] = TW3MovableControl.DisplayMode(Self.ClassType);
         Self.FHandle.style["visibility"] = "visible";
         TW3MovableControl.SetWasSized(Self);
      } else {
         Self.FHandle.style["display"] = "none";
         Self.FHandle.style["visibility"] = "hidden";
      }
      TW3TagObj.EndUpdate(Self);
   }
   /// procedure TW3MovableControl.SetWasMoved()
   ///  [line: 2030, column: 29, file: SmartCL.Components]
   ,SetWasMoved:function(Self) {
      Self.FWasMoved = true;
   }
   /// procedure TW3MovableControl.SetWasSized()
   ///  [line: 2035, column: 29, file: SmartCL.Components]
   ,SetWasSized:function(Self) {
      Self.FWasSized = true;
   }
   /// procedure TW3MovableControl.SetWidth(aValue: Integer)
   ///  [line: 1990, column: 29, file: SmartCL.Components]
   ,SetWidth:function(Self, aValue$9) {
      aValue$9 = Math.max(aValue$9,0);
      if (aValue$9!=TW3MovableControl.GetWidth$(Self)) {
         TW3TagObj.BeginUpdate(Self);
         Self.FHandle.style["width"] = TInteger.ToPxStr(aValue$9);
         TW3MovableControl.SetWasSized(Self);
         TW3TagObj.EndUpdate(Self);
      }
   }
   /// function TW3MovableControl.supportAdjustment() : Boolean
   ///  [line: 1768, column: 34, file: SmartCL.Components]
   ,supportAdjustment:function(Self) {
      return true;
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate$:function($){return $.ClassType.AfterUpdate($)}
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,StyleTagObject:TW3TagObj.StyleTagObject
   ,Create$19:TW3Component.Create$19
   ,GetHeight$:function($){return $.ClassType.GetHeight($)}
   ,GetWidth$:function($){return $.ClassType.GetWidth($)}
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight$:function($){return $.ClassType.SetHeight.apply($.ClassType, arguments)}
   ,SetWidth$:function($){return $.ClassType.SetWidth.apply($.ClassType, arguments)}
   ,supportAdjustment$:function($){return $.supportAdjustment($)}
};
/// TW3CustomControl = class (TW3MovableControl)
///  [line: 432, column: 3, file: SmartCL.Components]
var TW3CustomControl = {
   $ClassName:"TW3CustomControl",
   $Parent:TW3MovableControl
   ,$Init:function ($) {
      TW3MovableControl.$Init($);
      $.FAngle = 0;
      $.FClassNames = $.FFont = $.FGestureData = $.FNoBehavior = $.FOnAnimationBegins = $.FOnAnimationEnds = $.FOnChanged = $.FOnClick = $.FOnContextPopup = $.FOnDblClick = $.FOnGestureChange = $.FOnGestureEnd = $.FOnGestureStart = $.FOnGotFocus = $.FOnKeyDown = $.FOnKeyPress = $.FOnKeyUp = $.FOnLostFocus = $.FOnMouseDown = $.FOnMouseEnter = $.FOnMouseExit = $.FOnMouseMove = $.FOnMouseUp = $.FOnMouseWheel = $.FOnResize = $.FOnTouchBegins = $.FOnTouchEnds = $.FOnTouchMoves = $.FScrollInfo = $.FTouchData = null;
      $.FMouseCaptured = 0;
      $.FTouchBound = false;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 31, column: 43, file: SmartCL.MouseCapture]
   ,a$7:function(Self) {
      return vCaptureControl===Self;
   }
   /// procedure TW3CustomControl.AfterUpdate()
   ///  [line: 3025, column: 28, file: SmartCL.Components]
   ,AfterUpdate:function(Self) {
      if (TW3MovableControl.GetWasSized(Self)) {
         if (Self.FObjReady) {
            TW3MovableControl.Resize$(Self);
         }
         if (!TW3MovableControl.GetWasMoved(Self)) {
            TW3MovableControl.SetWasMoved(Self);
         }
      }
      if (TW3MovableControl.GetWasMoved(Self)) {
         TW3CustomControl.Invalidate$(Self);
      }
      TW3MovableControl.AfterUpdate(Self);
   }
   /// procedure TW3CustomControl.BindTouch()
   ///  [line: 2789, column: 28, file: SmartCL.Components]
   ,BindTouch:function(Self) {
      if (Self.FTouchBound) {
         return;
      }
      Self.FTouchBound = true;
      Self.FHandle.addEventListener("touchstart",$Event1(Self,TW3CustomControl.CMTouchBegins));
      Self.FHandle.addEventListener("touchmove",$Event1(Self,TW3CustomControl.CMTouchMove));
      Self.FHandle.addEventListener("touchend",$Event1(Self,TW3CustomControl.CMTouchEnds));
   }
   /// procedure TW3CustomControl.BringToFront()
   ///  [line: 2409, column: 28, file: SmartCL.Components]
   ,BringToFront:function(Self) {
      if (Self.FHandle) {
         Self.FHandle.style.zIndex = (TW3CustomControl.GetMaxZIndex($As(Self.FParent,TW3CustomControl))+1);
      }
   }
   /// procedure TW3CustomControl.CBAnimationBegins(const eventObj: Variant)
   ///  [line: 2753, column: 28, file: SmartCL.Components]
   ,CBAnimationBegins:function(Self, eventObj) {
      if (Self.FOnAnimationBegins) {
         Self.FOnAnimationBegins(Self);
      }
   }
   /// procedure TW3CustomControl.CBAnimationEnds(const eventObj: Variant)
   ///  [line: 2768, column: 28, file: SmartCL.Components]
   ,CBAnimationEnds:function(Self, eventObj$1) {
      if (Self.FOnAnimationEnds) {
         Self.FOnAnimationEnds(Self);
      }
   }
   /// procedure TW3CustomControl.CBChanged(eventObj: JEvent)
   ///  [line: 2783, column: 28, file: SmartCL.Components]
   ,CBChanged:function(Self, eventObj$2) {
      if (Self.FOnChanged) {
         Self.FOnChanged(Self);
      }
   }
   /// procedure TW3CustomControl.CBClick(eventObj: JEvent)
   ///  [line: 2674, column: 28, file: SmartCL.Components]
   ,CBClick:function(Self, eventObj$3) {
      if (Self.FOnClick) {
         Self.FOnClick(Self);
      }
   }
   /// function TW3CustomControl.CBContextPopup(event: JMouseEvent) : Boolean
   ///  [line: 2958, column: 27, file: SmartCL.Components]
   ,CBContextPopup:function(Self, event) {
      var Result = false;
      var sr$1 = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
      var mp = {X$1:0,Y$1:0};
      var handled = {v:false};
      sr$1 = TW3MovableControl.ScreenRect(Self);
      mp.X$1 = event.clientX-sr$1.Left$1;
      mp.Y$1 = event.clientY-sr$1.Top$1;
      handled.v = false;
      TW3CustomControl.ContextPopup(Self,mp,handled);
      Result = !handled.v;
      return Result
   }
   /// procedure TW3CustomControl.CBDblClick(eventObj: JEvent)
   ///  [line: 2694, column: 28, file: SmartCL.Components]
   ,CBDblClick:function(Self, eventObj$4) {
      if (Self.FOnDblClick) {
         Self.FOnDblClick(Self);
      }
   }
   /// procedure TW3CustomControl.CBFocused()
   ///  [line: 2324, column: 28, file: SmartCL.Components]
   ,CBFocused:function(Self) {
      if (Self.FOnGotFocus) {
         Self.FOnGotFocus(Self);
      }
   }
   /// procedure TW3CustomControl.CBKeyDown(eventObj: JKeyboardEvent)
   ///  [line: 2711, column: 28, file: SmartCL.Components]
   ,CBKeyDown:function(Self, eventObj$5) {
      if (Self.FOnKeyDown) {
         Self.FOnKeyDown(Self,eventObj$5.keyCode);
      }
   }
   /// procedure TW3CustomControl.CBKeyPress(eventObj: JKeyboardEvent)
   ///  [line: 2738, column: 28, file: SmartCL.Components]
   ,CBKeyPress:function(Self, eventObj$6) {
      if (Self.FOnKeyPress) {
         Self.FOnKeyPress(Self,eventObj$6.charCode);
      }
   }
   /// procedure TW3CustomControl.CBKeyUp(eventObj: JKeyboardEvent)
   ///  [line: 2723, column: 28, file: SmartCL.Components]
   ,CBKeyUp:function(Self, eventObj$7) {
      if (Self.FOnKeyUp) {
         Self.FOnKeyUp(Self,eventObj$7.keyCode);
      }
   }
   /// procedure TW3CustomControl.CBLostFocus()
   ///  [line: 2330, column: 28, file: SmartCL.Components]
   ,CBLostFocus:function(Self) {
      if (Self.FOnLostFocus) {
         Self.FOnLostFocus(Self);
      }
   }
   /// procedure TW3CustomControl.CBMouseDown(eventObj: JMouseEvent)
   ///  [line: 2513, column: 28, file: SmartCL.Components]
   ,CBMouseDown:function(Self, eventObj$8) {
      var sr$2 = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
      var shiftState = null;
      sr$2 = TW3MovableControl.ScreenRect(Self);
      shiftState = TShiftState.Current$1();
      shiftState.FMouseButtons = shiftState.FMouseButtons|(1<<eventObj$8.button);
      TShiftState.SetMouseEvent(shiftState,eventObj$8);
      TW3CustomControl.MouseDown(Self,eventObj$8.button,shiftState,eventObj$8.clientX-sr$2.Left$1,eventObj$8.clientY-sr$2.Top$1);
   }
   /// procedure TW3CustomControl.CBMouseEnter(eventObj: JMouseEvent)
   ///  [line: 2579, column: 28, file: SmartCL.Components]
   ,CBMouseEnter:function(Self, eventObj$9) {
      var sr$3 = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
      var shiftState$1 = null;
      sr$3 = TW3MovableControl.ScreenRect(Self);
      shiftState$1 = TShiftState.Current$1();
      TShiftState.SetMouseEvent(shiftState$1,eventObj$9);
      TW3CustomControl.MouseEnter(Self,shiftState$1,eventObj$9.clientX-sr$3.Left$1,eventObj$9.clientY-sr$3.Top$1);
   }
   /// procedure TW3CustomControl.CBMouseExit(eventObj: JMouseEvent)
   ///  [line: 2603, column: 28, file: SmartCL.Components]
   ,CBMouseExit:function(Self, eventObj$10) {
      var sr$4 = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
      var shiftState$2 = null;
      sr$4 = TW3MovableControl.ScreenRect(Self);
      shiftState$2 = TShiftState.Current$1();
      TShiftState.SetMouseEvent(shiftState$2,eventObj$10);
      TW3CustomControl.MouseExit(Self,shiftState$2,eventObj$10.clientX-sr$4.Left$1,eventObj$10.clientY-sr$4.Top$1);
   }
   /// procedure TW3CustomControl.CBMouseMove(eventObj: JMouseEvent)
   ///  [line: 2557, column: 28, file: SmartCL.Components]
   ,CBMouseMove:function(Self, eventObj$11) {
      var sr$5 = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
      var shiftState$3 = null;
      sr$5 = TW3MovableControl.ScreenRect(Self);
      shiftState$3 = TShiftState.Current$1();
      TShiftState.SetMouseEvent(shiftState$3,eventObj$11);
      TW3CustomControl.MouseMove(Self,shiftState$3,eventObj$11.clientX-sr$5.Left$1,eventObj$11.clientY-sr$5.Top$1);
   }
   /// procedure TW3CustomControl.CBMouseUp(eventObj: JMouseEvent)
   ///  [line: 2535, column: 28, file: SmartCL.Components]
   ,CBMouseUp:function(Self, eventObj$12) {
      var sr$6 = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
      var shiftState$4 = null;
      sr$6 = TW3MovableControl.ScreenRect(Self);
      shiftState$4 = TShiftState.Current$1();
      shiftState$4.FMouseButtons = shiftState$4.FMouseButtons&(~(1<<eventObj$12.button));
      TShiftState.SetMouseEvent(shiftState$4,eventObj$12);
      TW3CustomControl.MouseUp(Self,eventObj$12.button,shiftState$4,eventObj$12.clientX-sr$6.Left$1,eventObj$12.clientY-sr$6.Top$1);
   }
   /// procedure TW3CustomControl.CBMouseWheel(eventObj: JMouseWheelEvent)
   ///  [line: 2638, column: 28, file: SmartCL.Components]
   ,CBMouseWheel:function(Self, eventObj$13) {
      var wheelDelta$1 = 0;
      var handled$1 = {};
      handled$1.v = false;
      var sr$7 = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
      var shiftState$5 = null;
      var mousePos = {X$1:0,Y$1:0};
      if (Self.FOnMouseWheel) {
         if (eventObj$13.detail) {
            wheelDelta$1 = eventObj$13.detail*-40;
         } else {
            wheelDelta$1 = eventObj$13.wheelDelta;
         }
         sr$7 = TW3MovableControl.ScreenRect(Self);
         shiftState$5 = TShiftState.Current$1();
         TShiftState.SetMouseEvent(shiftState$5,eventObj$13);
         mousePos.X$1 = eventObj$13.clientX-sr$7.Left$1;
         mousePos.Y$1 = eventObj$13.clientY-sr$7.Top$1;
         TW3CustomControl.MouseWheel(Self,shiftState$5,wheelDelta$1,mousePos,handled$1);
         if (handled$1.v) {
            eventObj$13.preventDefault();
            eventObj$13.stopPropagation();
         }
      }
   }
   /// procedure TW3CustomControl.CMGestureChange()
   ///  [line: 2898, column: 28, file: SmartCL.Components]
   ,CMGestureChange:function(Self) {
      event.preventDefault();
      if (Self.FOnGestureChange) {
         if (Self.FGestureData) {
            TW3GestureData.Update$2(Self.FGestureData);
         } else {
            Self.FGestureData = TObject.Create($New(TW3GestureData));
         }
         Self.FOnGestureChange(Self,Self.FGestureData);
      }
   }
   /// procedure TW3CustomControl.CMGestureEnd()
   ///  [line: 2926, column: 28, file: SmartCL.Components]
   ,CMGestureEnd:function(Self) {
      event.preventDefault();
      if (Self.FOnGestureEnd) {
         if (Self.FGestureData) {
            TW3GestureData.Update$2(Self.FGestureData);
         } else {
            Self.FGestureData = TObject.Create($New(TW3GestureData));
         }
         Self.FOnGestureEnd(Self,Self.FGestureData);
      }
   }
   /// procedure TW3CustomControl.CMGestureStart()
   ///  [line: 2870, column: 28, file: SmartCL.Components]
   ,CMGestureStart:function(Self) {
      event.preventDefault();
      if (Self.FOnGestureStart) {
         if (Self.FGestureData) {
            TW3GestureData.Update$2(Self.FGestureData);
         } else {
            Self.FGestureData = TObject.Create($New(TW3GestureData));
         }
         Self.FOnGestureStart(Self,Self.FGestureData);
      }
   }
   /// procedure TW3CustomControl.CMTouchBegins(eventObj: JTouchEvent)
   ///  [line: 2805, column: 28, file: SmartCL.Components]
   ,CMTouchBegins:function(Self, eventObj$14) {
      if (Self.FOnTouchBegins) {
         if (Self.FTouchData) {
            TW3TouchData.Update$1(Self.FTouchData,eventObj$14);
         } else {
            Self.FTouchData = TObject.Create($New(TW3TouchData));
         }
         Self.FOnTouchBegins(Self,Self.FTouchData);
      }
   }
   /// procedure TW3CustomControl.CMTouchEnds(eventObj: JTouchEvent)
   ///  [line: 2843, column: 28, file: SmartCL.Components]
   ,CMTouchEnds:function(Self, eventObj$15) {
      if (Self.FOnTouchEnds) {
         if (Self.FTouchData) {
            TW3TouchData.Update$1(Self.FTouchData,eventObj$15);
         } else {
            Self.FTouchData = TObject.Create($New(TW3TouchData));
         }
         Self.FOnTouchEnds(Self,Self.FTouchData);
      }
   }
   /// procedure TW3CustomControl.CMTouchMove(eventObj: JTouchEvent)
   ///  [line: 2824, column: 28, file: SmartCL.Components]
   ,CMTouchMove:function(Self, eventObj$16) {
      if (Self.FOnTouchMoves) {
         if (Self.FTouchData) {
            TW3TouchData.Update$1(Self.FTouchData,eventObj$16);
         } else {
            Self.FTouchData = TObject.Create($New(TW3TouchData));
         }
         Self.FOnTouchMoves(Self,Self.FTouchData);
      }
   }
   /// procedure TW3CustomControl.ContextPopup(const mousePos: TPoint; var handled: Boolean)
   ///  [line: 2969, column: 28, file: SmartCL.Components]
   ,ContextPopup:function(Self, mousePos$1, handled$2) {
      if (Self.FOnContextPopup) {
         Self.FOnContextPopup(Self,mousePos$1,handled$2);
      }
   }
   /// constructor TW3CustomControl.Create(AOwner: TW3Component)
   ///  [line: 2218, column: 30, file: SmartCL.Components]
   ,Create$19:function(Self, AOwner$1) {
      TW3Component.Create$19(Self,AOwner$1);
      Self.FHandle["onclick"] = $Event1(Self,TW3CustomControl.CBClick$);
      return Self
   }
   /// procedure TW3CustomControl.FinalizeObject()
   ///  [line: 2239, column: 28, file: SmartCL.Components]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FFont);
      TObject.Free(Self.FClassNames);
      TObject.Free(Self.FScrollInfo);
      TObject.Free(Self.FTouchData);
      TObject.Free(Self.FGestureData);
      TW3MovableControl.FinalizeObject(Self);
   }
   /// function TW3CustomControl.GetBorderRadius() : Integer
   ///  [line: 3006, column: 27, file: SmartCL.Components]
   ,GetBorderRadius:function(Self) {
      return w3_getStyleAsInt(Self.FHandle,"bordertopleftRadius");
   }
   /// function TW3CustomControl.GetChildrenSortedByYPos() : TW3ComponentArray
   ///  [line: 2415, column: 27, file: SmartCL.Components]
   ,GetChildrenSortedByYPos:function(Self) {
      var Result = [];
      var mCount = 0;
      var x$5 = 0;
      var mAltered = false;
      var mObj$2 = null;
      var mLast = null;
      var mCurrent = null;
      Result.length=0;
      mCount = TW3Component.GetChildCount(Self);
      if (mCount>0) {
         var $temp6;
         for(x$5 = 0,$temp6 = mCount;x$5<$temp6;x$5++) {
            mObj$2 = TW3Component.GetChildObject(Self,x$5);
            if ($Is(mObj$2,TW3CustomControl)) {
               Result.push(mObj$2);
            }
         }
         if (Result.length>1) {
            do {
               mAltered = false;
               var $temp7;
               for(x$5 = 1,$temp7 = mCount;x$5<$temp7;x$5++) {
                  mLast = $As(Result[x$5-1],TW3CustomControl);
                  mCurrent = $As(Result[x$5],TW3CustomControl);
                  if (TW3MovableControl.GetTop(mCurrent)<TW3MovableControl.GetTop(mLast)) {
                     $ArraySwap(Result,(x$5-1),x$5);
                     mAltered = true;
                  }
               }
            } while (!(mAltered==false));
         }
      }
      return Result
   }
   /// function TW3CustomControl.GetEnabled() : Boolean
   ///  [line: 2302, column: 27, file: SmartCL.Components]
   ,GetEnabled:function(Self) {
      return Self.FHandle.disabled!=true;
   }
   /// function TW3CustomControl.GetFont() : TW3ControlFont
   ///  [line: 2271, column: 27, file: SmartCL.Components]
   ,GetFont:function(Self) {
      var Result = null;
      if (Self.FFont===null) {
         Self.FFont = TW3ControlFont.Create$36($New(TW3ControlFont),Self);
      }
      Result = Self.FFont;
      return Result
   }
   /// function TW3CustomControl.GetHasFocus() : Boolean
   ///  [line: 2486, column: 27, file: SmartCL.Components]
   ,GetHasFocus:function(Self) {
      var Result = false;
      if (Self.FHandle) {
         Result = document.activeElement==Self.FHandle;
      }
      return Result
   }
   /// function TW3CustomControl.GetMaxZIndex() : Integer
   ///  [line: 2393, column: 27, file: SmartCL.Components]
   ,GetMaxZIndex:function(Self) {
      var Result = 0;
      var iChild = 0;
      var obj = null;
      var objZIndex = 0;
      Result = 0;
      var $temp8;
      for(iChild = 0,$temp8 = TW3Component.GetChildCount(Self);iChild<$temp8;iChild++) {
         obj = TW3Component.GetChildObject(Self,iChild);
         if (((obj!==null)&&$Is(obj,TW3CustomControl))&&obj.FHandle) {
            objZIndex = TW3CustomControl.GetZIndexAsInt($As(obj,TW3CustomControl),0);
            if (objZIndex>Result) {
               Result = objZIndex;
            }
            objZIndex = TW3CustomControl.GetMaxZIndex($As(obj,TW3CustomControl));
            if (objZIndex>Result) {
               Result = objZIndex;
            }
         }
      }
      return Result
   }
   /// function TW3CustomControl.GetScrollInfo() : TW3ScrollInfo
   ///  [line: 2295, column: 27, file: SmartCL.Components]
   ,GetScrollInfo:function(Self) {
      var Result = null;
      if (Self.FScrollInfo===null) {
         Self.FScrollInfo = TW3OwnedObject.Create$4$($New(TW3ScrollInfo),Self);
      }
      Result = Self.FScrollInfo;
      return Result
   }
   /// function TW3CustomControl.GetStyleClass() : String
   ///  [line: 2458, column: 27, file: SmartCL.Components]
   ,GetStyleClass:function(Self) {
      return w3_getAttribAsStr(Self.FHandle,"class");
   }
   /// function TW3CustomControl.GetZIndexAsInt(default: Integer = 0) : Integer
   ///  [line: 2336, column: 27, file: SmartCL.Components]
   ,GetZIndexAsInt:function(Self, default$1) {
      var Result = 0;
      var mData$3;
      Result = default$1;
      mData$3 = Self.FHandle.style["zIndex"];
      if (Self.FHandle) {
         if (TVariant.IsNumber(mData$3)) {
            Result = parseInt(mData$3,10);
         } else if (TVariant.IsString(mData$3)) {
            Result = parseInt(mData$3,10);
            if (isNaN(Result)) {
               Result = default$1;
            }
         }
      }
      return Result
   }
   /// function TW3CustomControl.GetZoom() : Float
   ///  [line: 2278, column: 27, file: SmartCL.Components]
   ,GetZoom:function(Self) {
      return w3_getStyleAsFloat(Self.FHandle,"zoom");
   }
   /// procedure TW3CustomControl.InitializeCapture()
   ///  [line: 36, column: 34, file: SmartCL.MouseCapture]
   ,InitializeCapture:function(Self) {
      var doc$1 = undefined;
      doc$1 = document;
      doc$1.addEventListener("mousedown",function (evt) {
         if (vCaptureControl!==null) {
            TW3CustomControl.CBMouseDown$(vCaptureControl,evt);
            evt.stopImmediatePropagation();
         }
      },true);
      doc$1.addEventListener("mousemove",function (evt$1) {
         if (vCaptureControl!==null) {
            TW3CustomControl.CBMouseMove$(vCaptureControl,evt$1);
            evt$1.stopImmediatePropagation();
         }
      },true);
      doc$1.addEventListener("mouseup",function (evt$2) {
         if (vCaptureControl!==null) {
            TW3CustomControl.CBMouseUp$(vCaptureControl,evt$2);
            evt$2.stopImmediatePropagation();
         }
         vCaptureControl = null;
      },true);
      doc$1.addEventListener("mouseover",function (evt$3) {
         if (vCaptureControl!==null) {
            TW3CustomControl.CBMouseEnter(vCaptureControl,evt$3);
            evt$3.stopImmediatePropagation();
         }
      },true);
      doc$1.addEventListener("mouseout",function (evt$4) {
         if (vCaptureControl!==null) {
            TW3CustomControl.CBMouseExit(vCaptureControl,evt$4);
            evt$4.stopImmediatePropagation();
         }
      },true);
      doc$1.addEventListener("mousewheel",function (evt$5) {
         if (vCaptureControl!==null) {
            TW3CustomControl.CBMouseWheel(vCaptureControl,evt$5);
            evt$5.stopImmediatePropagation();
         }
      },true);
      doc$1.addEventListener("onclick",function (evt$6) {
         if (vCaptureControl!==null) {
            TW3CustomControl.CBClick$(vCaptureControl,evt$6);
            evt$6.stopImmediatePropagation();
         }
      },true);
      doc$1.addEventListener("ondblclick",function (evt$7) {
         if (vCaptureControl!==null) {
            TW3CustomControl.CBDblClick(vCaptureControl,evt$7);
            evt$7.stopImmediatePropagation();
         }
      },true);
      vCaptureInitialized = true;
   }
   /// procedure TW3CustomControl.InitializeObject()
   ///  [line: 2224, column: 28, file: SmartCL.Components]
   ,InitializeObject:function(Self) {
      TW3MovableControl.InitializeObject(Self);
      Self.FNoBehavior = $Event0(Self,TW3Component.CBNoBehavior);
      w3_bind2(Self.FHandle,"onselectstart",$Event0(Self,TW3Component.CBNoBehavior));
      w3_bind2(Self.FHandle,"onfocus",$Event0(Self,TW3CustomControl.CBFocused));
      w3_bind2(Self.FHandle,"onblur",$Event0(Self,TW3CustomControl.CBLostFocus));
   }
   /// procedure TW3CustomControl.Invalidate()
   ///  [line: 2975, column: 28, file: SmartCL.Components]
   ,Invalidate:function(Self) {
      /* null */
   }
   /// procedure TW3CustomControl.LayoutChildren()
   ///  [line: 2980, column: 28, file: SmartCL.Components]
   ,LayoutChildren:function(Self) {
      var x$6 = 0;
      var mChild$1 = null;
      TW3TagObj.BeginUpdate(Self);
      try {
         var $temp9;
         for(x$6 = 0,$temp9 = TW3Component.GetChildCount(Self);x$6<$temp9;x$6++) {
            mChild$1 = TW3Component.GetChildObject(Self,x$6);
            if ($Is(mChild$1,TW3CustomControl)) {
               setTimeout($Event0($As(mChild$1,TW3CustomControl),TW3CustomControl.LayoutChildren),10);
            }
         }
      } finally {
         TW3MovableControl.SetWasSized(Self);
         TW3TagObj.EndUpdate(Self);
      }
   }
   /// procedure TW3CustomControl.MouseDown(button: TMouseButton; shiftState: TShiftState; x: Integer; y: Integer)
   ///  [line: 2523, column: 28, file: SmartCL.Components]
   ,MouseDown:function(Self, button$3, shiftState$6, x$7, y$1) {
      if (Self.FOnMouseDown) {
         Self.FOnMouseDown(Self,button$3,shiftState$6,x$7,y$1);
      }
   }
   /// procedure TW3CustomControl.MouseEnter(shiftState: TShiftState; x: Integer; y: Integer)
   ///  [line: 2587, column: 28, file: SmartCL.Components]
   ,MouseEnter:function(Self, shiftState$7, x$8, y$2) {
      if (Self.FOnMouseEnter) {
         Self.FOnMouseEnter(Self,shiftState$7,x$8,y$2);
      }
   }
   /// procedure TW3CustomControl.MouseExit(shiftState: TShiftState; x: Integer; y: Integer)
   ///  [line: 2611, column: 28, file: SmartCL.Components]
   ,MouseExit:function(Self, shiftState$8, x$9, y$3) {
      if (Self.FOnMouseExit) {
         Self.FOnMouseExit(Self,shiftState$8,x$9,y$3);
      }
   }
   /// procedure TW3CustomControl.MouseMove(shiftState: TShiftState; x: Integer; y: Integer)
   ///  [line: 2565, column: 28, file: SmartCL.Components]
   ,MouseMove:function(Self, shiftState$9, x$10, y$4) {
      if (Self.FOnMouseMove) {
         Self.FOnMouseMove(Self,shiftState$9,x$10,y$4);
      }
   }
   /// procedure TW3CustomControl.MouseUp(button: TMouseButton; shiftState: TShiftState; x: Integer; y: Integer)
   ///  [line: 2545, column: 28, file: SmartCL.Components]
   ,MouseUp:function(Self, button$4, shiftState$10, x$11, y$5) {
      if (Self.FOnMouseUp) {
         Self.FOnMouseUp(Self,button$4,shiftState$10,x$11,y$5);
      }
   }
   /// procedure TW3CustomControl.MouseWheel(shift: TShiftState; wheelDelta: Integer; const mousePos: TPoint; var handled: Boolean)
   ///  [line: 2662, column: 28, file: SmartCL.Components]
   ,MouseWheel:function(Self, shift, wheelDelta$2, mousePos$2, handled$3) {
      if (Self.FOnMouseWheel) {
         Self.FOnMouseWheel(Self,shift,wheelDelta$2,mousePos$2,handled$3);
      }
   }
   /// procedure TW3CustomControl.ReleaseCapture()
   ///  [line: 112, column: 28, file: SmartCL.MouseCapture]
   ,ReleaseCapture:function(Self) {
      --Self.FMouseCaptured;
      if (!Self.FMouseCaptured) {
         if (Self.FHandle.releaseCapture) {
            Self.FHandle.releaseCapture();
         }
         vCaptureControl = null;
      } else if (Self.FMouseCaptured<0) {
         Self.FMouseCaptured = 0;
      }
   }
   /// procedure TW3CustomControl.SetAngle(aValue: Float)
   ///  [line: 2468, column: 28, file: SmartCL.Components]
   ,SetAngle:function(Self, aValue$10) {
      var mStyle = "";
      if (aValue$10!=Self.FAngle) {
         Self.FAngle = aValue$10;
         mStyle = "rotate("+FloatToStr$_Float_Integer_(aValue$10,2)+"deg)";
         w3_setStyle(Self.FHandle,w3_CSSPrefix("Transform"),mStyle);
      }
   }
   /// procedure TW3CustomControl.SetBorderRadius(aNewRadius: Integer)
   ///  [line: 3017, column: 28, file: SmartCL.Components]
   ,SetBorderRadius:function(Self, aNewRadius) {
      TW3TagObj.BeginUpdate(Self);
      w3_setStyle(Self.FHandle,"borderRadius",TInteger.ToPxStr(aNewRadius));
      TW3MovableControl.SetWasSized(Self);
      TW3TagObj.EndUpdate(Self);
   }
   /// procedure TW3CustomControl.SetCapture()
   ///  [line: 100, column: 28, file: SmartCL.MouseCapture]
   ,SetCapture:function(Self) {
      if (!Self.FMouseCaptured) {
         if (Self.FHandle.setCapture) {
            Self.FHandle.setCapture(true);
         } else if (!vCaptureInitialized) {
            TW3CustomControl.InitializeCapture(Self.ClassType);
         }
         vCaptureControl = Self;
      }
      ++Self.FMouseCaptured;
   }
   /// procedure TW3CustomControl.SetEnabled(aValue: Boolean)
   ///  [line: 2307, column: 28, file: SmartCL.Components]
   ,SetEnabled:function(Self, aValue$11) {
      Self.FHandle.disabled = (!aValue$11);
   }
   /// procedure TW3CustomControl.SetFocus()
   ///  [line: 2480, column: 28, file: SmartCL.Components]
   ,SetFocus:function(Self) {
      if (Self.FHandle) {
         Self.FHandle.focus();
      }
   }
   /// procedure TW3CustomControl.SetStyleClass(aStyle: String)
   ///  [line: 2463, column: 28, file: SmartCL.Components]
   ,SetStyleClass:function(Self, aStyle) {
      w3_setAttrib(Self.FHandle,"class",aStyle);
   }
   /// procedure TW3CustomControl.SetZoom(aValue: Float)
   ///  [line: 2283, column: 28, file: SmartCL.Components]
   ,SetZoom:function(Self, aValue$12) {
      w3_setStyle(Self.FHandle,"zoom",aValue$12);
   }
   /// procedure TW3CustomControl.StyleTagObject()
   ///  [line: 2260, column: 28, file: SmartCL.Components]
   ,StyleTagObject:function(Self) {
      TW3TagObj.StyleTagObject(Self);
      w3_setAttrib(Self.FHandle,"tabindex",0);
      TW3CustomControl.SetStyleClass(Self,TObject.ClassName(Self.ClassType));
      TW3MovableControl.SetVisible(Self,true);
   }
   /// procedure TW3CustomControl._setAnimationBegins(const aValue: TAnimationBeginsEvent)
   ///  [line: 2744, column: 28, file: SmartCL.Components]
   ,_setAnimationBegins:function(Self, aValue$13) {
      if (aValue$13) {
         Self.FHandle[w3_CSSPrefix("AnimationStart")] = $Event1(Self,TW3CustomControl.CBAnimationBegins);
      } else {
         Self.FHandle[w3_CSSPrefix("AnimationStart")] = Self.FNoBehavior;
      }
      Self.FOnAnimationBegins = aValue$13;
   }
   /// procedure TW3CustomControl._setAnimationEnds(const aValue: TAnimationEndsEvent)
   ///  [line: 2759, column: 28, file: SmartCL.Components]
   ,_setAnimationEnds:function(Self, aValue$14) {
      if (aValue$14) {
         Self.FHandle[w3_CSSPrefix("AnimationEnd")] = $Event1(Self,TW3CustomControl.CBAnimationEnds);
      } else {
         Self.FHandle[w3_CSSPrefix("AnimationEnd")] = Self.FNoBehavior;
      }
      Self.FOnAnimationEnds = aValue$14;
   }
   /// procedure TW3CustomControl._setChanged(const aValue: TChangedEvent)
   ///  [line: 2774, column: 28, file: SmartCL.Components]
   ,_setChanged:function(Self, aValue$15) {
      if (aValue$15) {
         Self.FHandle["onchange"] = $Event1(Self,TW3CustomControl.CBChanged);
      } else {
         Self.FHandle["onchange"] = Self.FNoBehavior;
      }
      Self.FOnChanged = aValue$15;
   }
   /// procedure TW3CustomControl._setContextPopup(const aValue: TContextPopupEvent)
   ///  [line: 2948, column: 28, file: SmartCL.Components]
   ,_setContextPopup:function(Self, aValue$16) {
      var mObj$3 = undefined;
      mObj$3 = Self.FHandle;
      if (aValue$16) {
         mObj$3["oncontextmenu"] = $Event1(Self,TW3CustomControl.CBContextPopup);
      } else {
         mObj$3["oncontextmenu"] = Self.FNoBehavior;
      }
      Self.FOnContextPopup = aValue$16;
   }
   /// procedure TW3CustomControl._setGestureChange(aValue: TGestureChangeEvent)
   ///  [line: 2883, column: 28, file: SmartCL.Components]
   ,_setGestureChange:function(Self, aValue$17) {
      if (Self.FOnGestureChange) {
         w3_RemoveEvent(Self.FHandle,"gesturechange",$Event0(Self,TW3CustomControl.CMGestureChange),true);
         Self.FOnGestureChange = null;
      }
      if (aValue$17) {
         Self.FOnGestureChange = aValue$17;
         w3_AddEvent(Self.FHandle,"gesturechange",$Event0(Self,TW3CustomControl.CMGestureChange),true);
      }
   }
   /// procedure TW3CustomControl._setGestureEnd(aValue: TGestureEndEvent)
   ///  [line: 2911, column: 28, file: SmartCL.Components]
   ,_setGestureEnd:function(Self, aValue$18) {
      if (Self.FOnGestureEnd) {
         w3_RemoveEvent(Self.FHandle,"gesturestart",$Event0(Self,TW3CustomControl.CMGestureEnd),true);
         Self.FOnGestureEnd = null;
      }
      if (aValue$18) {
         Self.FOnGestureEnd = aValue$18;
         w3_AddEvent(Self.FHandle,"gestureend",$Event0(Self,TW3CustomControl.CMGestureEnd),true);
      }
   }
   /// procedure TW3CustomControl._setGestureStart(aValue: TGestureStartEvent)
   ///  [line: 2855, column: 28, file: SmartCL.Components]
   ,_setGestureStart:function(Self, aValue$19) {
      if (Self.FOnGestureStart) {
         w3_RemoveEvent(Self.FHandle,"gesturestart",$Event0(Self,TW3CustomControl.CMGestureStart),true);
         Self.FOnGestureStart = null;
      }
      if (aValue$19) {
         Self.FOnGestureStart = aValue$19;
         w3_AddEvent(Self.FHandle,"gesturestart",$Event0(Self,TW3CustomControl.CMGestureStart),true);
      }
   }
   /// procedure TW3CustomControl._setGotFocus(const aValue: TGotFocusEvent)
   ///  [line: 2492, column: 28, file: SmartCL.Components]
   ,_setGotFocus:function(Self, aValue$20) {
      Self.FOnGotFocus = aValue$20;
   }
   /// procedure TW3CustomControl._setKeyDown(const aValue: TKeyDownEvent)
   ///  [line: 2705, column: 28, file: SmartCL.Components]
   ,_setKeyDown:function(Self, aValue$21) {
      Self.FHandle["onkeydown"] = $Event1(Self,TW3CustomControl.CBKeyDown$);
      Self.FOnKeyDown = aValue$21;
   }
   /// procedure TW3CustomControl._setKeyPress(const aValue: TKeyPressEvent)
   ///  [line: 2729, column: 28, file: SmartCL.Components]
   ,_setKeyPress:function(Self, aValue$22) {
      if (aValue$22) {
         Self.FHandle["onkeypress"] = $Event1(Self,TW3CustomControl.CBKeyPress);
      } else {
         Self.FHandle["onkeypress"] = Self.FNoBehavior;
      }
      Self.FOnKeyPress = aValue$22;
   }
   /// procedure TW3CustomControl._setKeyUp(const aValue: TKeyUpEvent)
   ///  [line: 2717, column: 28, file: SmartCL.Components]
   ,_setKeyUp:function(Self, aValue$23) {
      Self.FHandle["onkeyup"] = $Event1(Self,TW3CustomControl.CBKeyUp$);
      Self.FOnKeyUp = aValue$23;
   }
   /// procedure TW3CustomControl._setLostFocus(const aValue: TLostFocusEvent)
   ///  [line: 2501, column: 28, file: SmartCL.Components]
   ,_setLostFocus:function(Self, aValue$24) {
      Self.FOnLostFocus = aValue$24;
   }
   /// procedure TW3CustomControl._setMouseClick(const aValue: TMouseClickEvent)
   ///  [line: 2669, column: 28, file: SmartCL.Components]
   ,_setMouseClick:function(Self, aValue$25) {
      Self.FOnClick = aValue$25;
   }
   /// procedure TW3CustomControl._setMouseDblClick(const aValue: TMouseDblClickEvent)
   ///  [line: 2685, column: 28, file: SmartCL.Components]
   ,_setMouseDblClick:function(Self, aValue$26) {
      if (aValue$26) {
         Self.FHandle["ondblclick"] = $Event1(Self,TW3CustomControl.CBDblClick);
      } else {
         Self.FHandle["ondblclick"] = Self.FNoBehavior;
      }
      Self.FOnDblClick = aValue$26;
   }
   /// procedure TW3CustomControl._setMouseDown(const aValue: TMouseDownEvent)
   ///  [line: 2507, column: 28, file: SmartCL.Components]
   ,_setMouseDown:function(Self, aValue$27) {
      Self.FHandle["onmousedown"] = $Event1(Self,TW3CustomControl.CBMouseDown$);
      Self.FOnMouseDown = aValue$27;
   }
   /// procedure TW3CustomControl._setMouseEnter(const aValue: TMouseEnterEvent)
   ///  [line: 2571, column: 28, file: SmartCL.Components]
   ,_setMouseEnter:function(Self, aValue$28) {
      if (aValue$28) {
         Self.FHandle["onmouseover"] = $Event1(Self,TW3CustomControl.CBMouseEnter);
      } else {
         Self.FHandle["onmouseover"] = Self.FNoBehavior;
      }
      Self.FOnMouseEnter = aValue$28;
   }
   /// procedure TW3CustomControl._setMouseExit(const aValue: TMouseExitEvent)
   ///  [line: 2593, column: 28, file: SmartCL.Components]
   ,_setMouseExit:function(Self, aValue$29) {
      if (aValue$29) {
         Self.FHandle["onmouseout"] = $Event1(Self,TW3CustomControl.CBMouseExit);
      } else {
         Self.FHandle["onmouseout"] = Self.FNoBehavior;
      }
      Self.FOnMouseExit = aValue$29;
   }
   /// procedure TW3CustomControl._setMouseMove(const aValue: TMouseMoveEvent)
   ///  [line: 2551, column: 28, file: SmartCL.Components]
   ,_setMouseMove:function(Self, aValue$30) {
      Self.FHandle["onmousemove"] = $Event1(Self,TW3CustomControl.CBMouseMove$);
      Self.FOnMouseMove = aValue$30;
   }
   /// procedure TW3CustomControl._setMouseUp(const aValue: TMouseUpEvent)
   ///  [line: 2529, column: 28, file: SmartCL.Components]
   ,_setMouseUp:function(Self, aValue$31) {
      Self.FHandle["onmouseup"] = $Event1(Self,TW3CustomControl.CBMouseUp$);
      Self.FOnMouseUp = aValue$31;
   }
   /// procedure TW3CustomControl._setMouseWheel(const aValue: TMouseWheelEvent)
   ///  [line: 2617, column: 28, file: SmartCL.Components]
   ,_setMouseWheel:function(Self, aValue$32) {
      var onEventSupported = false;
      var mObj$4 = undefined;
      mObj$4 = Self.FHandle;
      
    onEventSupported = 'onmousewheel' in mObj$4;
  if (onEventSupported) {
         if (aValue$32) {
            mObj$4["onmousewheel"] = $Event1(Self,TW3CustomControl.CBMouseWheel);
         } else {
            mObj$4["onmousewheel"] = Self.FNoBehavior;
         }
      } else if (aValue$32) {
         mObj$4.addEventListener("DOMMouseScroll",$Event1(Self,TW3CustomControl.CBMouseWheel),false);
      } else {
         mObj$4.removeEventListener("DOMMouseScroll",$Event1(Self,TW3CustomControl.CBMouseWheel),false);
      }
      Self.FOnMouseWheel = aValue$32;
   }
   /// procedure TW3CustomControl._setResize(const aValue: TReSizeEvent)
   ///  [line: 2943, column: 28, file: SmartCL.Components]
   ,_setResize:function(Self, aValue$33) {
      Self.FOnResize = aValue$33;
   }
   /// procedure TW3CustomControl._setTouchBegins(const aValue: TTouchBeginEvent)
   ///  [line: 2798, column: 28, file: SmartCL.Components]
   ,_setTouchBegins:function(Self, aValue$34) {
      if (aValue$34) {
         TW3CustomControl.BindTouch(Self);
      }
      Self.FOnTouchBegins = aValue$34;
   }
   /// procedure TW3CustomControl._setTouchEnds(const aValue: TTouchEndEvent)
   ///  [line: 2836, column: 28, file: SmartCL.Components]
   ,_setTouchEnds:function(Self, aValue$35) {
      if (aValue$35) {
         TW3CustomControl.BindTouch(Self);
      }
      Self.FOnTouchEnds = aValue$35;
   }
   /// procedure TW3CustomControl._setTouchMoves(const aValue: TTouchMoveEvent)
   ///  [line: 2817, column: 28, file: SmartCL.Components]
   ,_setTouchMoves:function(Self, aValue$36) {
      if (aValue$36) {
         TW3CustomControl.BindTouch(Self);
      }
      Self.FOnTouchMoves = aValue$36;
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate$:function($){return $.ClassType.AfterUpdate($)}
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,Create$19$:function($){return $.ClassType.Create$19.apply($.ClassType, arguments)}
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick$:function($){return $.ClassType.CBClick.apply($.ClassType, arguments)}
   ,CBKeyDown$:function($){return $.ClassType.CBKeyDown.apply($.ClassType, arguments)}
   ,CBKeyUp$:function($){return $.ClassType.CBKeyUp.apply($.ClassType, arguments)}
   ,CBMouseDown$:function($){return $.ClassType.CBMouseDown.apply($.ClassType, arguments)}
   ,CBMouseMove$:function($){return $.ClassType.CBMouseMove.apply($.ClassType, arguments)}
   ,CBMouseUp$:function($){return $.ClassType.CBMouseUp.apply($.ClassType, arguments)}
   ,GetEnabled$:function($){return $.ClassType.GetEnabled($)}
   ,Invalidate$:function($){return $.ClassType.Invalidate($)}
   ,SetEnabled$:function($){return $.ClassType.SetEnabled.apply($.ClassType, arguments)}
};
/// TW3DisplayView = class (TW3CustomControl)
///  [line: 41, column: 3, file: SmartCL.Application]
var TW3DisplayView = {
   $ClassName:"TW3DisplayView",
   $Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FArrange = false;
      $.FArrangeKind = 0;
   }
   /// procedure TW3DisplayView.ArrangeChildren(aKind: TW3DisplayViewArangeType)
   ///  [line: 293, column: 26, file: SmartCL.Application]
   ,ArrangeChildren:function(Self, aKind) {
      var x$12 = 0;
      var dx$1 = 0;
      var dy$1 = 0;
      var mObj$5 = null;
      var mCount$1 = 0;
      var mRect = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
      var wd = 0;
      var hd = 0;
      mCount$1 = TW3Component.GetChildCount(Self);
      if (mCount$1>0) {
         mRect = TW3MovableControl.GetBoundsRect(Self);
         switch (aKind) {
            case 0 :
               wd = TRect$Width$1(mRect);
               hd = TRect$Height$1(mRect);
               var $temp10;
               for(x$12 = 0,$temp10 = mCount$1;x$12<$temp10;x$12++) {
                  mObj$5 = TW3Component.GetChildObject(Self,x$12);
                  if ($Is(mObj$5,TW3CustomControl)&&(!$Is(mObj$5,TW3BlockBox))) {
                     TW3MovableControl.SetSize($As(mObj$5,TW3CustomControl),wd,hd);
                  }
               }
               break;
            case 1 :
               dy$1 = mRect.Top$1;
               wd = TRect$Width$1(mRect);
               var $temp11;
               for(x$12 = 0,$temp11 = mCount$1;x$12<$temp11;x$12++) {
                  mObj$5 = TW3Component.GetChildObject(Self,x$12);
                  if ($Is(mObj$5,TW3CustomControl)&&(!$Is(mObj$5,TW3BlockBox))) {
                     hd = TW3MovableControl.GetHeight$($As(mObj$5,TW3CustomControl));
                     TW3MovableControl.SetBounds$2($As(mObj$5,TW3CustomControl),mRect.Left$1,dy$1,wd,hd);
                     (dy$1+= hd);
                  }
               }
               break;
            case 2 :
               dx$1 = mRect.Left$1;
               hd = TRect$Height$1(mRect);
               var $temp12;
               for(x$12 = 0,$temp12 = mCount$1;x$12<$temp12;x$12++) {
                  mObj$5 = TW3Component.GetChildObject(Self,x$12);
                  if ($Is(mObj$5,TW3CustomControl)&&(!$Is(mObj$5,TW3BlockBox))) {
                     wd = TW3MovableControl.GetWidth$($As(mObj$5,TW3CustomControl));
                     TW3MovableControl.SetBounds$2($As(mObj$5,TW3CustomControl),dx$1,mRect.Top$1,wd,hd);
                     (dx$1+= wd);
                  }
               }
               break;
         }
      }
   }
   /// procedure TW3DisplayView.InitializeObject()
   ///  [line: 245, column: 26, file: SmartCL.Application]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FArrange = true;
      Self.FArrangeKind = 0;
   }
   /// procedure TW3DisplayView.ReSize()
   ///  [line: 378, column: 26, file: SmartCL.Application]
   ,Resize:function(Self) {
      TW3MovableControl.Resize(Self);
      if (Self.FArrange) {
         TW3DisplayView.ArrangeChildren(Self,Self.FArrangeKind);
      }
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,StyleTagObject:TW3CustomControl.StyleTagObject
   ,Create$19:TW3CustomControl.Create$19
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,GetEnabled:TW3CustomControl.GetEnabled
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
};
/// TW3Display = class (TW3CustomControl)
///  [line: 57, column: 3, file: SmartCL.Application]
var TW3Display = {
   $ClassName:"TW3Display",
   $Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FFooter = $.FHeader = $.FOnOrient = $.FView = null;
   }
   /// procedure TW3Display.FinalizeObject()
   ///  [line: 397, column: 22, file: SmartCL.Application]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FView);
      if (Self.FHeader) {
         TObject.Free(Self.FHeader);
      }
      if (Self.FFooter) {
         TObject.Free(Self.FFooter);
      }
      TW3CustomControl.FinalizeObject(Self);
   }
   /// function TW3Display.GetHeightOfChildren() : Integer
   ///  [line: 418, column: 21, file: SmartCL.Application]
   ,GetHeightOfChildren:function(Self) {
      var Result = 0;
      var x$13 = 0;
      var mObj$6 = null;
      var $temp13;
      for(x$13 = 0,$temp13 = TW3Component.GetChildCount(Self);x$13<$temp13;x$13++) {
         mObj$6 = TW3Component.GetChildObject(Self,x$13);
         if (((mObj$6!==Self.FView)&&$Is(mObj$6,TW3CustomControl))&&(!$Is(mObj$6,TW3BlockBox))) {
            (Result+= TW3MovableControl.GetHeight$($As(mObj$6,TW3CustomControl)));
         }
      }
      return Result
   }
   /// procedure TW3Display.InitializeObject()
   ///  [line: 390, column: 22, file: SmartCL.Application]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FView = TW3Component.Create$19$($New(TW3DisplayView),Self);
      TW3MovableControl.SetTop(Self.FView,5);
   }
   /// procedure TW3Display.PositionFormInView(aForm: TW3CustomForm)
   ///  [line: 462, column: 22, file: SmartCL.Application]
   ,PositionFormInView:function(Self, aForm$3) {
      var mApp = null;
      var dx$2 = 0;
      var dy$2 = 0;
      if (aForm$3) {
         mApp = Application();
         if ((mApp!==null)&&(!mApp.FTerminated)) {
            dx$2 = TW3ScrollInfo.GetScrollLeft(TW3CustomControl.GetScrollInfo(Self.FView));
            dy$2 = TW3ScrollInfo.GetScrollTop(TW3CustomControl.GetScrollInfo(Self.FView));
            TW3MovableControl.SetBounds$2(aForm$3,dx$2,dy$2,TW3MovableControl.GetWidth$(Self.FView),TW3MovableControl.GetHeight$(Self.FView));
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3Screen),$R[0],["PositionFormInView", TObject.ClassName(Self.ClassType), "Form parameter was NIL error"]);
      }
   }
   /// procedure TW3Display.ReSize()
   ///  [line: 431, column: 22, file: SmartCL.Application]
   ,Resize:function(Self) {
      var mTotal = 0;
      var mList = [];
      var x$14 = 0;
      var dy$3 = 0;
      var mObj$7 = null;
      TW3MovableControl.Resize(Self);
      mTotal = TW3Display.GetHeightOfChildren(Self);
      TW3MovableControl.SetHeight$(Self.FView,TW3MovableControl.GetHeight$(Self)-mTotal);
      mList = TW3CustomControl.GetChildrenSortedByYPos(Self);
      dy$3 = 0;
      var $temp14;
      for(x$14 = 0,$temp14 = mList.length;x$14<$temp14;x$14++) {
         mObj$7 = $As(mList[x$14],TW3CustomControl);
         if ($Is(mObj$7,TW3BlockBox)) {
            TW3MovableControl.SetBounds$2(mObj$7,0,0,TW3MovableControl.GetWidth$(Self),TW3MovableControl.GetHeight$(Self));
         } else {
            TW3MovableControl.SetBounds$2(mObj$7,0,dy$3,TW3MovableControl.GetWidth$(Self),TW3MovableControl.GetHeight$(mObj$7));
            (dy$3+= TW3MovableControl.GetHeight$(mObj$7));
         }
      }
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,StyleTagObject:TW3CustomControl.StyleTagObject
   ,Create$19:TW3CustomControl.Create$19
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,GetEnabled:TW3CustomControl.GetEnabled
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
};
/// TW3BlockBox = class (TW3CustomControl)
///  [line: 38, column: 3, file: SmartCL.Application]
var TW3BlockBox = {
   $ClassName:"TW3BlockBox",
   $Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,StyleTagObject:TW3CustomControl.StyleTagObject
   ,Create$19:TW3CustomControl.Create$19
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,GetEnabled:TW3CustomControl.GetEnabled
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
};
/// TModalResult enumeration
///  [line: 82, column: 3, file: SmartCL.Application]
var TModalResult = [ "mrCancel", "mrOK" ];
/// TFormEntryEffect enumeration
///  [line: 30, column: 3, file: SmartCL.Application]
var TFormEntryEffect = [ "feNone", "feFromRight", "feToLeft" ];
/// TDisplayOrientation enumeration
///  [line: 32, column: 3, file: SmartCL.Application]
var TDisplayOrientation = [ "soPortrait", "soLandscapeLeft", "soLandscapeRight", "soFlipped" ];
/// TApplicationFormsList = class (TObject)
///  [line: 174, column: 3, file: SmartCL.Application]
var TApplicationFormsList = {
   $ClassName:"TApplicationFormsList",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FFormOwner = null;
      $.FList = [];
      $.FNextAutoCreate = 0;
   }
   /// procedure TApplicationFormsList.AutoCreateForm(aFormInfo: TApplicationFormInfo)
   ///  [line: 1052, column: 33, file: SmartCL.Application]
   ,AutoCreateForm:function(Self, aFormInfo) {
      if (!aFormInfo.a$54) {
         aFormInfo.a$54 = TW3Component.Create$19$($NewDyn(aFormInfo.a$52,""),Self.FFormOwner);
         TW3CustomApplication.RegisterFormInstance(Application(),aFormInfo.a$54,aFormInfo.a$56);
      }
      aFormInfo.a$57 = true;
   }
   /// procedure TApplicationFormsList.AutoCreateForms(owner: TW3Component)
   ///  [line: 1062, column: 33, file: SmartCL.Application]
   ,AutoCreateForms:function(Self, owner) {
      var a$75 = 0;
      var info = null;
      var a$76 = [];
      Self.FFormOwner = owner;
      Self.FNextAutoCreate = 0;
      a$76 = Self.FList;
      var $temp15;
      for(a$75 = 0,$temp15 = a$76.length;a$75<$temp15;a$75++) {
         info = a$76[a$75];
         TApplicationFormsList.AutoCreateForm(Self,info);
         ++Self.FNextAutoCreate;
         if (info.a$56) {
            break;
         }
      }
      setTimeout($Event0(Self,TApplicationFormsList.AutoCreateNextForm),50);
   }
   /// procedure TApplicationFormsList.AutoCreateNextForm()
   ///  [line: 1077, column: 33, file: SmartCL.Application]
   ,AutoCreateNextForm:function(Self) {
      var iForm = 0;
      var info$1 = null;
      var $temp16;
      for(iForm = Self.FNextAutoCreate,$temp16 = Self.FList.length;iForm<$temp16;iForm++) {
         info$1 = Self.FList[iForm];
         if ((info$1.a$53&&(!(info$1.a$54!==null)))&&(!info$1.a$57)) {
            TApplicationFormsList.AutoCreateForm(Self,info$1);
            ++Self.FNextAutoCreate;
            if (Self.FNextAutoCreate<(Self.FList.length-1)) {
               setTimeout($Event0(Self,TApplicationFormsList.AutoCreateNextForm),50);
            }
            break;
         }
      }
   }
   /// function TApplicationFormsList.IndexOfFormClass(aFormClass: TW3CustomFormClass) : Integer
   ///  [line: 1111, column: 32, file: SmartCL.Application]
   ,IndexOfFormClass:function(Self, aFormClass) {
      var Result = 0;
      var $temp17;
      for(Result = 0,$temp17 = Self.FList.length;Result<$temp17;Result++) {
         if (Self.FList[Result].a$52==aFormClass) {
            return Result;
         }
      }
      Result = -1;
      return Result
   }
   /// function TApplicationFormsList.IndexOfUnitName(aUnitName: String) : Integer
   ///  [line: 1119, column: 32, file: SmartCL.Application]
   ,IndexOfUnitName:function(Self, aUnitName) {
      var Result = 0;
      var $temp18;
      for(Result = 0,$temp18 = Self.FList.length;Result<$temp18;Result++) {
         if (SameText(Self.FList[Result].a$55,aUnitName)) {
            return Result;
         }
      }
      Result = -1;
      return Result
   }
   /// procedure TApplicationFormsList.RegisterAutoCreate(aUnitName: String; isAutoCreate: Boolean; isMainForm: Boolean)
   ///  [line: 1127, column: 33, file: SmartCL.Application]
   ,RegisterAutoCreate:function(Self, aUnitName$1, isAutoCreate, isMainForm$1) {
      var formInfo = null;
      var idx = 0;
      idx = TApplicationFormsList.IndexOfUnitName(Self,aUnitName$1);
      if (idx>=0) {
         formInfo = Self.FList[idx];
      } else {
         formInfo = TObject.Create($New(TApplicationFormInfo));
         formInfo.a$55 = aUnitName$1;
         Self.FList.push(formInfo);
      }
      formInfo.a$56 = isMainForm$1;
      formInfo.a$53 = isAutoCreate;
   }
   /// procedure TApplicationFormsList.RegisterForm(aUnitName: String; aFormClass: TW3CustomFormClass)
   ///  [line: 1143, column: 33, file: SmartCL.Application]
   ,RegisterForm:function(Self, aUnitName$2, aFormClass$1) {
      var formInfo$1 = null;
      var idx$1 = 0;
      idx$1 = TApplicationFormsList.IndexOfUnitName(Self,aUnitName$2);
      if (idx$1>=0) {
         formInfo$1 = Self.FList[idx$1];
      } else {
         formInfo$1 = TObject.Create($New(TApplicationFormInfo));
         formInfo$1.a$55 = aUnitName$2;
         Self.FList.push(formInfo$1);
      }
      formInfo$1.a$52 = aFormClass$1;
   }
   /// procedure TApplicationFormsList.RegisterFormInstance(aFormClass: TW3CustomFormClass; aFormInstance: TW3CustomForm)
   ///  [line: 1158, column: 33, file: SmartCL.Application]
   ,RegisterFormInstance$1:function(Self, aFormClass$2, aFormInstance) {
      var formInfo$2 = null;
      var idx$2 = 0;
      idx$2 = TApplicationFormsList.IndexOfFormClass(Self,aFormClass$2);
      if (idx$2>=0) {
         formInfo$2 = Self.FList[idx$2];
      } else {
         formInfo$2 = TObject.Create($New(TApplicationFormInfo));
         formInfo$2.a$52 = aFormClass$2;
         Self.FList.push(formInfo$2);
      }
      formInfo$2.a$54 = aFormInstance;
      formInfo$2.a$57 = true;
   }
   /// procedure TApplicationFormsList.UnregisterFormInstance(aFormInstance: TW3CustomForm)
   ///  [line: 1174, column: 33, file: SmartCL.Application]
   ,UnregisterFormInstance:function(Self, aFormInstance$1) {
      var i$1 = 0;
      var $temp19;
      for(i$1 = 0,$temp19 = Self.FList.length;i$1<$temp19;i$1++) {
         if (Self.FList[i$1].a$54===aFormInstance$1) {
            Self.FList[i$1].a$54 = null;
         }
      }
   }
   ,Destroy:TObject.Destroy
};
/// TApplicationFormInfo = class (TObject)
///  [line: 164, column: 3, file: SmartCL.Application]
var TApplicationFormInfo = {
   $ClassName:"TApplicationFormInfo",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.a$57 = $.a$56 = $.a$53 = false;
      $.a$55 = "";
      $.a$54 = null;
      $.a$52 = null;
   }
   ,Destroy:TObject.Destroy
};
function Forms$2() {
   return FormsFactory();
};
/// EW3Exception = class (Exception)
///  [line: 31, column: 3, file: SmartCL.System]
var EW3Exception = {
   $ClassName:"EW3Exception",
   $Parent:Exception
   ,$Init:function ($) {
      Exception.$Init($);
   }
   /// constructor EW3Exception.CreateFmt(aText: String; const aValues: array of const)
   ///  [line: 1050, column: 26, file: SmartCL.System]
   ,CreateFmt:function(Self, aText, aValues) {
      Exception.Create(Self,Format(aText,aValues.slice(0)));
      return Self
   }
   ,Destroy:Exception.Destroy
};
/// EW3Screen = class (EW3Exception)
///  [line: 27, column: 3, file: SmartCL.Application]
var EW3Screen = {
   $ClassName:"EW3Screen",
   $Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// EW3Application = class (EW3Exception)
///  [line: 28, column: 3, file: SmartCL.Application]
var EW3Application = {
   $ClassName:"EW3Application",
   $Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
function Application() {
   return Instance;
};
/// TModalInfo = class (TObject)
///  [line: 207, column: 3, file: SmartCL.Application]
var TModalInfo = {
   $ClassName:"TModalInfo",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.OnOK = null;
      $.OnCancel = null;
      $.ModalForm = $.ModalPanel = $.OwnerForm = $.OpaqueMask = null;
   }
   ,Destroy:TObject.Destroy
};
function FormsFactory() {
   var Result = null;
   if (!GForms) {
      GForms = TObject.Create($New(TApplicationFormsList));
   }
   Result = GForms;
   return Result
};
function VarIsValidRef(aRef) {
   var Result = false;
   
    Result = !((aRef == null) || (aRef == undefined));
  return Result
};
/// TVariant = class (TObject)
///  [line: 222, column: 3, file: System.Types]
var TVariant = {
   $ClassName:"TVariant",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TVariant.AsFloat(const aValue: Variant) : Float
   ///  [line: 1242, column: 25, file: System.Types]
   ,AsFloat:function(aValue$37) {
      var Result = 0;
      if (VarIsValidRef(aValue$37)) {
         Result = Number(aValue$37);
      }
      return Result
   }
   /// function TVariant.AsInteger(const aValue: Variant) : Integer
   ///  [line: 1230, column: 25, file: System.Types]
   ,AsInteger:function(aValue$38) {
      var Result = 0;
      if (VarIsValidRef(aValue$38)) {
         Result = parseInt(aValue$38,10);
      }
      return Result
   }
   /// function TVariant.AsObject(const aValue: Variant) : TObject
   ///  [line: 1248, column: 25, file: System.Types]
   ,AsObject:function(aValue$39) {
      var Result = null;
      if (VarIsValidRef(aValue$39)) {
         
      Result = aValue$39;
          } else {
         Result = null;
      }
      return Result
   }
   /// function TVariant.AsString(const aValue: Variant) : String
   ///  [line: 1236, column: 25, file: System.Types]
   ,AsString:function(aValue$40) {
      var Result = "";
      if (VarIsValidRef(aValue$40)) {
         Result = ""+aValue$40;
      }
      return Result
   }
   /// function TVariant.CreateObject() : Variant
   ///  [line: 1266, column: 25, file: System.Types]
   ,CreateObject:function() {
      var Result = undefined;
      
    return {};
  return Result
   }
   /// function TVariant.IsNAN(const aValue: Variant) : Boolean
   ///  [line: 1321, column: 25, file: System.Types]
   ,IsNAN:function(aValue$41) {
      return isNaN(Number(aValue$41));
   }
   /// function TVariant.IsNull(const aValue: Variant) : Boolean
   ///  [line: 1280, column: 25, file: System.Types]
   ,IsNull:function(aValue$42) {
      return (aValue$42===null);
   }
   /// function TVariant.IsNumber(const aValue: Variant) : Boolean
   ///  [line: 1294, column: 25, file: System.Types]
   ,IsNumber:function(aValue$43) {
      var Result = false;
      
    if (aValue$43 == null) return false;
    if (aValue$43 == undefined) return false;
    if (typeof(aValue$43) === "number") return true;
  return Result
   }
   /// function TVariant.IsString(const aValue: Variant) : Boolean
   ///  [line: 1285, column: 25, file: System.Types]
   ,IsString:function(aValue$44) {
      var Result = false;
      
    if (aValue$44 == null) return false;
    if (aValue$44 == undefined) return false;
    if (typeof(aValue$44) === "string") return true;
  return Result
   }
   ,Destroy:TObject.Destroy
};
/// TRectF = record
///  [line: 157, column: 3, file: System.Types]
function Copy$TRectF(s,d) {
   d.Bottom=s.Bottom;
   d.Left=s.Left;
   d.Right=s.Right;
   d.Top=s.Top;
   return d;
}
function Clone$TRectF($) {
   return {
      Bottom:$.Bottom,
      Left:$.Left,
      Right:$.Right,
      Top:$.Top
   }
}
/// function TRectF.CreateBounded(x1: Float; y1: Float; x2: Float; y2: Float) : TRectF
///  [line: 746, column: 23, file: System.Types]
function CreateBounded(x1, y1, x2, y2) {
   var Result = {Bottom:0,Left:0,Right:0,Top:0};
   if (x1<x2) {
      Result.Left = x1;
      Result.Right = x2;
   } else {
      Result.Left = x2;
      Result.Right = x1;
   }
   if (y1<y2) {
      Result.Top = y1;
      Result.Bottom = y2;
   } else {
      Result.Top = y2;
      Result.Bottom = y1;
   }
   return Result
}
/// function TRectF.Expose(var Self: TRectF; const aChildRect: TRectF) : TExposure
///  [line: 933, column: 17, file: System.Types]
function TRectF$Expose(Self$2, aChildRect) {
   var Result = 0;
   if ((((aChildRect.Left>=Self$2.Right)||(aChildRect.Top>=Self$2.Bottom))||(aChildRect.Right<=Self$2.Left))||(aChildRect.Bottom<=Self$2.Top)) {
      Result = 2;
   } else if ((((aChildRect.Left<Self$2.Left)||(aChildRect.Top<Self$2.Top))||(aChildRect.Right>(Self$2.Right-1)))||(aChildRect.Bottom>(Self$2.Bottom-1))) {
      Result = 1;
   } else {
      Result = 0;
   }
   return Result
}
/// function TRectF.Height(var Self: TRectF) : Float
///  [line: 870, column: 17, file: System.Types]
function TRectF$Height(Self$3) {
   return Self$3.Bottom-Self$3.Top;
}
/// function TRectF.Width(var Self: TRectF) : Float
///  [line: 865, column: 17, file: System.Types]
function TRectF$Width(Self$4) {
   return Self$4.Right-Self$4.Left;
}
/// TRect = record
///  [line: 121, column: 3, file: System.Types]
function Copy$TRect(s,d) {
   d.Bottom$1=s.Bottom$1;
   d.Left$1=s.Left$1;
   d.Right$1=s.Right$1;
   d.Top$1=s.Top$1;
   return d;
}
function Clone$TRect($) {
   return {
      Bottom$1:$.Bottom$1,
      Left$1:$.Left$1,
      Right$1:$.Right$1,
      Top$1:$.Top$1
   }
}
/// function TRect.ContainsPos(var Self: TRect; const aLeft: Integer; const aTop: Integer) : Boolean
///  [line: 671, column: 16, file: System.Types]
function TRect$ContainsPos$1(Self$5, aLeft$2, aTop$2) {
   return (((aLeft$2>=Self$5.Left$1)&&(aLeft$2<=Self$5.Right$1))&&(aTop$2>=Self$5.Top$1))&&(aTop$2<=Self$5.Bottom$1);
}
/// function TRect.Create(const aLeft: Integer; const aTop: Integer; const aRight: Integer; const aBottom: Integer) : TRect
///  [line: 470, column: 22, file: System.Types]
function Create$10(aLeft$3, aTop$3, aRight, aBottom) {
   var Result = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
   Result.Left$1 = aLeft$3;
   Result.Top$1 = aTop$3;
   Result.Right$1 = aRight;
   Result.Bottom$1 = aBottom;
   return Result
}
/// function TRect.Height(var Self: TRect) : Integer
///  [line: 525, column: 16, file: System.Types]
function TRect$Height$1(Self$6) {
   return Self$6.Bottom$1-Self$6.Top$1;
}
/// function TRect.Width(var Self: TRect) : Integer
///  [line: 520, column: 16, file: System.Types]
function TRect$Width$1(Self$7) {
   return Self$7.Right$1-Self$7.Left$1;
}
/// TPointF = record
///  [line: 80, column: 3, file: System.Types]
function Copy$TPointF(s,d) {
   d.X=s.X;
   d.Y=s.Y;
   return d;
}
function Clone$TPointF($) {
   return {
      X:$.X,
      Y:$.Y
   }
}
/// TPoint = record
///  [line: 45, column: 3, file: System.Types]
function Copy$TPoint(s,d) {
   d.X$1=s.X$1;
   d.Y$1=s.Y$1;
   return d;
}
function Clone$TPoint($) {
   return {
      X$1:$.X$1,
      Y$1:$.Y$1
   }
}
/// function TPoint.Create(const aCol: Integer; const aRow: Integer) : TPoint
///  [line: 256, column: 23, file: System.Types]
function Create$13(aCol, aRow) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = aCol;
   Result.Y$1 = aRow;
   return Result
}
/// TInteger = class (TObject)
///  [line: 191, column: 3, file: System.Types]
var TInteger = {
   $ClassName:"TInteger",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TInteger.Diff(const Primary: Integer; const Secondary: Integer) : Integer
   ///  [line: 1135, column: 25, file: System.Types]
   ,Diff:function(Primary, Secondary) {
      var Result = 0;
      if (Primary!=Secondary) {
         if (Primary>Secondary) {
            Result = Primary-Secondary;
         } else {
            Result = Secondary-Primary;
         }
         if (Result<0) {
            Result = (Result-1)^(-1);
         }
      } else {
         Result = 0;
      }
      return Result
   }
   /// function TInteger.EnsureRange(const aValue: Integer; const aMin: Integer; const aMax: Integer) : Integer
   ///  [line: 1089, column: 25, file: System.Types]
   ,EnsureRange:function(aValue$45, aMin, aMax) {
      return ClampInt(aValue$45,aMin,aMax);
   }
   /// function TInteger.ToNearest(const Value: Integer; const Factor: Integer) : Integer
   ///  [line: 1120, column: 25, file: System.Types]
   ,ToNearest:function(Value$5, Factor) {
      var Result = 0;
      var FTemp$1 = 0;
      Result = Value$5;
      FTemp$1 = Value$5%Factor;
      if (FTemp$1>0) {
         (Result+= (Factor-FTemp$1));
      }
      return Result
   }
   /// function TInteger.ToPxStr(const aValue: Integer) : String
   ///  [line: 1067, column: 25, file: System.Types]
   ,ToPxStr:function(aValue$46) {
      return aValue$46.toString()+"px";
   }
   /// function TInteger.WrapRange(const aValue: Integer; const aLowRange: Integer; const aHighRange: Integer) : Integer
   ///  [line: 1103, column: 25, file: System.Types]
   ,WrapRange:function(aValue$47, aLowRange, aHighRange) {
      var Result = 0;
      if (aValue$47>aHighRange) {
         Result = aLowRange+TInteger.Diff(aHighRange,(aValue$47-1));
         if (Result>aHighRange) {
            Result = TInteger.WrapRange(Result,aLowRange,aHighRange);
         }
      } else if (aValue$47<aLowRange) {
         Result = aHighRange-TInteger.Diff(aLowRange,(aValue$47+1));
         if (Result<aLowRange) {
            Result = TInteger.WrapRange(Result,aLowRange,aHighRange);
         }
      } else {
         Result = aValue$47;
      }
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// TExposure enumeration
///  [line: 118, column: 3, file: System.Types]
var TExposure = [ "esVisible", "esPartly", "esNone" ];
function OffsetPoint(a, b$1) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = a.X$1+b$1.X$1;
   Result.Y$1 = a.Y$1+b$1.Y$1;
   return Result
};
function OffsetPoint$1(a$77, b$2) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = a$77.X$1+b$2;
   Result.Y$1 = a$77.Y$1+b$2;
   return Result
};
function OffsetPoint$2(a$78, b$3) {
   var Result = {X:0,Y:0};
   Result.X = a$78.X+b$3.X;
   Result.Y = a$78.Y+b$3.Y;
   return Result
};
function OffsetPoint$3(a$79, b$4) {
   var Result = {X:0,Y:0};
   Result.X = a$79.X+b$4;
   Result.Y = a$79.Y+b$4;
   return Result
};
function OffsetPoint$4(a$80, b$5) {
   var Result = {X:0,Y:0};
   Result.X = a$80.X+b$5;
   Result.Y = a$80.Y+b$5;
   return Result
};
function MinusPoint(a$81, b$6) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = a$81.X$1-b$6.X$1;
   Result.Y$1 = a$81.Y$1-b$6.Y$1;
   return Result
};
function MinusPoint$1(a$82, b$7) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = a$82.X$1-b$7;
   Result.Y$1 = a$82.Y$1-b$7;
   return Result
};
function MinusPoint$2(a$83, b$8) {
   var Result = {X:0,Y:0};
   Result.X = a$83.X-b$8.X;
   Result.Y = a$83.Y-b$8.Y;
   return Result
};
function MinusPoint$3(a$84, b$9) {
   var Result = {X:0,Y:0};
   Result.X = a$84.X-b$9;
   Result.Y = a$84.Y-b$9;
   return Result
};
function MinusPoint$4(a$85, b$10) {
   var Result = {X:0,Y:0};
   Result.X = a$85.X-b$10;
   Result.Y = a$85.Y-b$10;
   return Result
};
function ExpandPoint(a$86, b$11) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = Math.round(a$86.X$1*b$11.X$1);
   Result.Y$1 = Math.round(a$86.Y$1*b$11.Y$1);
   return Result
};
function ExpandPoint$1(a$87, b$12) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = Math.round(a$87.X$1*b$12);
   Result.Y$1 = Math.round(a$87.Y$1*b$12);
   return Result
};
function ExpandPoint$2(a$88, b$13) {
   var Result = {X$1:0,Y$1:0};
   Result.X$1 = Math.round(a$88.X$1*b$13);
   Result.Y$1 = Math.round(a$88.Y$1*b$13);
   return Result
};
function ExpandPoint$3(a$89, b$14) {
   var Result = {X:0,Y:0};
   Result.X = a$89.X*b$14.X;
   Result.Y = a$89.Y*b$14.Y;
   return Result
};
function ExpandPoint$4(a$90, b$15) {
   var Result = {X:0,Y:0};
   Result.X = a$90.X*b$15;
   Result.Y = a$90.Y*b$15;
   return Result
};
function ExpandPoint$5(a$91, b$16) {
   var Result = {X:0,Y:0};
   Result.X = a$91.X*b$16;
   Result.Y = a$91.Y*b$16;
   return Result
};
function WriteLn(value$2) {
   if (window.console) {
      window.console.log(value$2);
   }
};
function w3_setStyle(tagRef, aStyleName, aStyleValue) {
   if (tagRef) {
      tagRef.style[aStyleName] = aStyleValue;
   }
};
function w3_setProperty(tagRef$1, aPropName, aValue$48) {
   tagRef$1[aPropName] = aValue$48;
};
function w3_setElementParentByRef(aElement, aParent) {
   if (VarIsValidRef(aParent)) {
      if (VarIsValidRef(aElement)) {
         aParent.appendChild(aElement);
      } else {
         throw Exception.Create($New(Exception),"Failed to add element to parent, element is null");
      }
   }
};
function w3_setCssStyle(tagRef$2, aStyleName$1, aStyleValue$1) {
   tagRef$2.style.setProperty(aStyleName$1,aStyleValue$1);
};
function w3_setAttrib(tagRef$3, aAttribName, aValue$49) {
   if (tagRef$3) {
      tagRef$3.setAttribute(aAttribName,aValue$49);
   }
};
function w3_RequestAnimationFrame(aMethod) {
   var Result = undefined;
   if (!vRequestAnimFrame) {
      InitAnimationFrameShim();
   }
   Result = vRequestAnimFrame(aMethod);
   return Result
};
function w3_RemoveEvent(a_tagRef, a_eventName, a_callback, a_useCapture) {
   if (a_eventName=="mousewheel") {
      a_eventName = "DOMMouseScroll";
   }
   a_tagRef.removeEventListener(a_eventName,a_callback,a_useCapture);
};
function w3_RemoveElementByRef(aElement$1, aParent$1) {
   if (aParent$1) {
      aParent$1.removeChild(aElement$1);
   }
};
function w3_RemoveClass(tagRef$4, aClassName) {
   var reg = undefined;
   if (w3_HasClass(tagRef$4,aClassName)) {
      
      reg = new RegExp("(\\s|^)" + aClassName + "(\\s|$)");
      (tagRef$4).className=(tagRef$4).className.replace(reg," ").replace('  ',' ').trim();
       }
};
function w3_RegisterBrowserAPI(aDriver) {
   vDriver = aDriver;
};
function w3_NameToUrlStr(aUrl) {
   return "url("+aUrl+")";
};
function w3_HasClass(tagRef$5, aClassName$1) {
   var Result = false;
   
    Result = ((tagRef$5).className.match(new RegExp("(\\s|^)"+aClassName$1+"(\\s|$)")))?true:false;
  return Result
};
function w3_GetUniqueObjId() {
   var Result = "";
   ++vUniqueNumber;
   Result = "OBJ"+vUniqueNumber.toString();
   return Result
};
function w3_GetUniqueNumber() {
   var Result = 0;
   ++vUniqueNumber;
   Result = vUniqueNumber;
   return Result
};
function w3_getStyleAsStr(tagRef$6, aStyleName$2) {
   var Result = "";
   var mData;
   mData = w3_getStyle(tagRef$6,aStyleName$2);
   if (TVariant.IsString(mData)) {
      Result = TVariant.AsString(mData);
   } else if (TVariant.IsNumber(mData)) {
      Result = TVariant.AsInteger(mData).toString();
   }
   return Result
};
function w3_getStyleAsInt(tagRef$7, aStyleName$3) {
   var Result = 0;
   var mData$1;
   mData$1 = w3_getStyle(tagRef$7,aStyleName$3);
   if (TVariant.IsNumber(mData$1)) {
      Result = parseInt(mData$1,10);
   } else if (TVariant.IsString(mData$1)) {
      Result = parseInt(mData$1,10);
   }
   if (isNaN(Result)) {
      Result = 0;
   }
   return Result
};
function w3_getStyleAsFloat(tagRef$8, aStyleName$4) {
   var Result = 0;
   var mData$2 = undefined;
   mData$2 = w3_getStyle(tagRef$8,aStyleName$4);
   if (VarIsValidRef(mData$2)) {
      try {
         if (TVariant.IsNumber(mData$2)) {
            Result = TVariant.AsFloat(mData$2);
            if (isNaN(Result)) {
               Result = 0;
            }
         } else if (TVariant.IsString(mData$2)) {
            Result = Number(mData$2);
            if (isNaN(Result)) {
               Result = 0;
            }
         }
      } catch ($e) {
         var e$5 = $W($e);
         /* null */
      }
   }
   return Result
};
function w3_getStyle(tagRef$9, aStyleName$5) {
   var Result = undefined;
   var mObj = undefined;
   mObj = document.defaultView.getComputedStyle(tagRef$9,null);
   if (mObj) {
      Result = mObj.getPropertyValue(aStyleName$5);
   }
   return Result
};
function w3_getPropertyAsStr(tagRef$10, aPropName$1) {
   var Result = "";
   if (tagRef$10) {
      Result = ""+tagRef$10[aPropName$1];
   }
   return Result
};
function w3_getPropertyAsInt(tagRef$11, aPropName$2) {
   var Result = 0;
   if (tagRef$11) {
      Result = parseInt(tagRef$11[aPropName$2],10);
   }
   return Result
};
function w3_getIsSafari() {
   var Result = false;
   
    if (navigator.userAgent.match(/Safari/i)) Result=true;
  return Result
};
function w3_getIsOpera() {
   var Result = false;
   
    if (navigator.userAgent.match(/Opera/i)) Result=true;
  return Result
};
function w3_getIsIPod() {
   var Result = false;
   
    if (navigator.userAgent.match(/iPod/i)) Result=true;
  return Result
};
function w3_getIsIPhone() {
   var Result = false;
   
    if (navigator.userAgent.match(/iPhone/i)) Result=true;
  return Result
};
function w3_getIsIPad() {
   var Result = false;
   
    if (navigator.userAgent.match(/iPad/i)) Result=true;
  return Result
};
function w3_getIsInternetExplorer() {
   var Result = false;
   
    if (navigator.userAgent.match(/MSIE/i)) Result=true;
  return Result
};
function w3_getIsFirefox() {
   var Result = false;
   
    if (navigator.userAgent.match(/Firefox/i)) Result=true;
  return Result
};
function w3_getIsChrome() {
   var Result = false;
   
    if (navigator.userAgent.match(/Chrome/i)) Result=true;
  return Result
};
function w3_getIsAndroid() {
   var Result = false;
   
    if (navigator.userAgent.match(/Android/i)) Result=true;
  return Result
};
function w3_getCssStyleAsInteger(tagRef$12, aStyleName$6) {
   var Result = 0;
   var Value$1;
   Value$1 = w3_getCssStyle(tagRef$12,aStyleName$6);
   if (TVariant.IsNumber(Value$1)) {
      Result = parseInt(Value$1,10);
   } else if (TVariant.IsString(Value$1)) {
      Result = parseInt(""+Value$1,10);
   }
   if (isNaN(Result)) {
      Result = 0;
   }
   return Result
};
function w3_getCssStyle(tagRef$13, aStyleName$7) {
   return tagRef$13.style.getPropertyValue(aStyleName$7);
};
function w3_getAttribAsStr(tagRef$14, aAttribName$1) {
   var Result = "";
   var mValue;
   mValue = tagRef$14.getAttribute(aAttribName$1,0);
   if (mValue) {
      Result = ""+mValue;
   }
   return Result
};
function w3_getAttrib(tagRef$15, aAttribName$2) {
   var Result = undefined;
   if (tagRef$15) {
      Result = tagRef$15.getAttribute(aAttribName$2);
   }
   return Result
};
function w3_CSSPrefixDef(aCSS) {
   return "-"+BrowserAPI().FCSSToken+"-"+aCSS;
};
function w3_CSSPrefix(aCSS$1) {
   return BrowserAPI().FCSSToken+aCSS$1;
};
function w3_createHtmlElement(aTypeName) {
   return document.createElement(aTypeName);
};
function w3_bind2(obj_ref, event_name, callback) {
   obj_ref[event_name] = callback;
};
function w3_AddEvent(a_tagRef$1, a_eventName$1, a_callback$1, a_useCapture$1) {
   if (a_eventName$1=="mousewheel") {
      a_eventName$1 = "DOMMouseScroll";
   }
   a_tagRef$1.addEventListener(a_eventName$1,a_callback$1,a_useCapture$1);
};
function w3_AddClass(tagRef$16, aClassName$2) {
   if (!w3_HasClass(tagRef$16,aClassName$2)) {
      tagRef$16.className+=" "+aClassName$2;
   }
};
/// TW3CustomBrowserAPI = class (TObject)
///  [line: 51, column: 3, file: SmartCL.System]
var TW3CustomBrowserAPI = {
   $ClassName:"TW3CustomBrowserAPI",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FCSSAnimation = $.FCSSBackgroundColor = $.FCSSBackgroundImage = $.FCSSBackgroundPos = $.FCSSBackgroundSize = $.FCSSToken = $.FCSSTransform = "";
   }
   /// function TW3CustomBrowserAPI.DevicePixelRatio() : Float
   ///  [line: 418, column: 36, file: SmartCL.System]
   ,DevicePixelRatio:function() {
      var Result = 0;
      
   Result = window.devicePixelRatio || 1;
   return Result
   }
   ,Destroy:TObject.Destroy
};
/// TW3WebkitBrowserAPI = class (TW3CustomBrowserAPI)
///  [line: 99, column: 3, file: SmartCL.System]
var TW3WebkitBrowserAPI = {
   $ClassName:"TW3WebkitBrowserAPI",
   $Parent:TW3CustomBrowserAPI
   ,$Init:function ($) {
      TW3CustomBrowserAPI.$Init($);
   }
   /// constructor TW3WebkitBrowserAPI.Create()
   ///  [line: 459, column: 33, file: SmartCL.System]
   ,Create$3:function(Self) {
      Self.FCSSToken = "webkit";
      Self.FCSSBackgroundImage = "background-image";
      Self.FCSSBackgroundSize = "webkitbackgroundSize";
      Self.FCSSBackgroundPos = "webkitbackgroundPosition";
      Self.FCSSBackgroundColor = "webkitbackgroundColor";
      Self.FCSSTransform = "webkitTransform";
      Self.FCSSAnimation = "webkitAnimation";
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TW3OwnedObject = class (TObject)
///  [line: 40, column: 3, file: SmartCL.System]
var TW3OwnedObject = {
   $ClassName:"TW3OwnedObject",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FOwner = null;
   }
   /// function TW3OwnedObject.AcceptParent(aObject: TObject) : Boolean
   ///  [line: 718, column: 25, file: SmartCL.System]
   ,AcceptParent:function(Self, aObject) {
      return true;
   }
   /// constructor TW3OwnedObject.Create(AOwner: TObject)
   ///  [line: 707, column: 28, file: SmartCL.System]
   ,Create$4:function(Self, AOwner$2) {
      TObject.Create(Self);
      if (TW3OwnedObject.AcceptParent$(Self,AOwner$2)) {
         Self.FOwner = AOwner$2;
      } else {
         throw EW3Exception.CreateFmt($New(EW3OwnedObject),$R[0],["constructor", TObject.ClassName(Self.ClassType), "Unsuitable owner object-type error"]);
      }
      return Self
   }
   ,Destroy:TObject.Destroy
   ,AcceptParent$:function($){return $.ClassType.AcceptParent.apply($.ClassType, arguments)}
   ,Create$4$:function($){return $.ClassType.Create$4.apply($.ClassType, arguments)}
};
/// TW3OperaBrowserAPI = class (TW3CustomBrowserAPI)
///  [line: 110, column: 3, file: SmartCL.System]
var TW3OperaBrowserAPI = {
   $ClassName:"TW3OperaBrowserAPI",
   $Parent:TW3CustomBrowserAPI
   ,$Init:function ($) {
      TW3CustomBrowserAPI.$Init($);
   }
   /// constructor TW3OperaBrowserAPI.Create()
   ///  [line: 444, column: 32, file: SmartCL.System]
   ,Create$5:function(Self) {
      Self.FCSSToken = "O";
      Self.FCSSBackgroundImage = "OBackgroundImage";
      Self.FCSSBackgroundSize = "OBackgroundSize";
      Self.FCSSBackgroundPos = "OBackgroundPosition";
      Self.FCSSBackgroundColor = "backgroundColor";
      Self.FCSSTransform = "OTransform";
      Self.FCSSAnimation = "OAnimation";
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TW3IEBrowserAPI = class (TW3CustomBrowserAPI)
///  [line: 115, column: 3, file: SmartCL.System]
var TW3IEBrowserAPI = {
   $ClassName:"TW3IEBrowserAPI",
   $Parent:TW3CustomBrowserAPI
   ,$Init:function ($) {
      TW3CustomBrowserAPI.$Init($);
   }
   /// constructor TW3IEBrowserAPI.Create()
   ///  [line: 429, column: 29, file: SmartCL.System]
   ,Create$6:function(Self) {
      Self.FCSSToken = "ms";
      Self.FCSSBackgroundImage = "msBackgroundImage";
      Self.FCSSBackgroundSize = "msBackgroundSize";
      Self.FCSSBackgroundPos = "msBackgroundPosition";
      Self.FCSSBackgroundColor = "backgroundColor";
      Self.FCSSTransform = "msTransform";
      Self.FCSSAnimation = "msAnimation";
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TW3FirefoxBrowserAPI = class (TW3CustomBrowserAPI)
///  [line: 105, column: 3, file: SmartCL.System]
var TW3FirefoxBrowserAPI = {
   $ClassName:"TW3FirefoxBrowserAPI",
   $Parent:TW3CustomBrowserAPI
   ,$Init:function ($) {
      TW3CustomBrowserAPI.$Init($);
   }
   /// constructor TW3FirefoxBrowserAPI.Create()
   ///  [line: 474, column: 34, file: SmartCL.System]
   ,Create$7:function(Self) {
      Self.FCSSToken = "Moz";
      Self.FCSSBackgroundImage = "backgroundImage";
      Self.FCSSBackgroundSize = "backgroundSize";
      Self.FCSSBackgroundPos = "backgroundPosition";
      Self.FCSSBackgroundColor = "backgroundColor";
      Self.FCSSTransform = "MozTransform";
      Self.FCSSAnimation = "MozAnimation";
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TW3BrowserVendor enumeration
///  [line: 244, column: 3, file: SmartCL.System]
var TW3BrowserVendor = [ "bvUnknown", "bviOS", "bvAndroid", "bvChrome", "bvSafari", "bvFirefox", "bvOpera", "bvIE" ];
/// EW3OwnedObject = class (EW3Exception)
///  [line: 37, column: 3, file: SmartCL.System]
var EW3OwnedObject = {
   $ClassName:"EW3OwnedObject",
   $Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
function BrowserAPI() {
   var Result = null;
   if (vDriver===null) {
      InternalInitVendorInfo();
   }
   Result = vDriver;
   return Result
};
function InternalInitVendorInfo() {
   if (w3_getIsAndroid()) {
      vVendor = 2;
   } else if (w3_getIsSafari()) {
      vVendor = 4;
   } else if (w3_getIsFirefox()) {
      vVendor = 5;
   } else if (w3_getIsChrome()) {
      vVendor = 3;
   } else if (w3_getIsInternetExplorer()) {
      vVendor = 7;
   } else if (w3_getIsOpera()) {
      vVendor = 6;
   }
   if (!vVendor) {
      if ((w3_getIsIPhone()||w3_getIsIPad())||w3_getIsIPod()) {
         vVendor = 1;
      }
   }
   switch (vVendor) {
      case 1 :
      case 4 :
      case 3 :
      case 2 :
         w3_RegisterBrowserAPI(TW3WebkitBrowserAPI.Create$3($New(TW3WebkitBrowserAPI)));
         break;
      case 5 :
         w3_RegisterBrowserAPI(TW3FirefoxBrowserAPI.Create$7($New(TW3FirefoxBrowserAPI)));
         break;
      case 7 :
         w3_RegisterBrowserAPI(TW3IEBrowserAPI.Create$6($New(TW3IEBrowserAPI)));
         break;
      case 6 :
         w3_RegisterBrowserAPI(TW3OperaBrowserAPI.Create$5($New(TW3OperaBrowserAPI)));
         break;
      default :
         w3_RegisterBrowserAPI(TW3FirefoxBrowserAPI.Create$7($New(TW3FirefoxBrowserAPI)))   }
};
function InitAnimationFrameShim() {
   
    vRequestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.msRequestAnimationFrame     ||
              function( callback ){
                return window.setTimeout(callback, 1000 / 60);
              };
    })();
    vCancelAnimFrame = (function(){
      return  window.cancelAnimationFrame       ||
              window.webkitCancelAnimationFrame ||
              window.mozCancelAnimationFrame    ||
              window.msCancelAnimationFrame     ||
              function( handle ){
                window.clearTimeout(handle);
              };
    })();
  };
/// TW3CustomForm = class (TW3CustomControl)
///  [line: 24, column: 3, file: SmartCL.Forms]
var TW3CustomForm = {
   $ClassName:"TW3CustomForm",
   $Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FCaption = "";
      $.FInitialized = false;
   }
   /// constructor TW3CustomForm.Create(AOwner: TW3Component)
   ///  [line: 57, column: 27, file: SmartCL.Forms]
   ,Create$19:function(Self, AOwner$3) {
      TW3CustomControl.Create$19(Self,AOwner$3);
      TApplicationFormsList.RegisterFormInstance$1(Forms$2(),$AsClass(TObject.ClassType(Self.ClassType),TW3CustomForm),Self);
      return Self
   }
   /// destructor TW3CustomForm.Destroy()
   ///  [line: 63, column: 26, file: SmartCL.Forms]
   ,Destroy:function(Self) {
      TW3CustomApplication.UnRegisterFormInstance(Application(),Self);
      TApplicationFormsList.UnregisterFormInstance(Forms$2(),Self);
   }
   /// procedure TW3CustomForm.FormActivated()
   ///  [line: 87, column: 25, file: SmartCL.Forms]
   ,FormActivated:function(Self) {
      var x$15 = 0;
      var mObj$8 = null;
      var mControl$1 = null;
      if (!Self.FInitialized) {
         Self.FInitialized = true;
         TW3CustomForm.InitializeForm$(Self);
      }
      if (Self.FObjReady) {
         var $temp20;
         for(x$15 = 0,$temp20 = TW3Component.GetChildCount(Self);x$15<$temp20;x$15++) {
            mObj$8 = TW3Component.GetChildObject(Self,x$15);
            if ($Is(mObj$8,TW3CustomControl)) {
               mControl$1 = $As(mObj$8,TW3CustomControl);
               if (mControl$1.FObjReady&&TW3MovableControl.GetVisible(mControl$1)) {
                  TW3CustomControl.LayoutChildren(mControl$1);
               }
            }
         }
      }
   }
   /// procedure TW3CustomForm.FormDeactivated()
   ///  [line: 112, column: 25, file: SmartCL.Forms]
   ,FormDeactivated:function(Self) {
      /* null */
   }
   /// procedure TW3CustomForm.InitializeForm()
   ///  [line: 77, column: 25, file: SmartCL.Forms]
   ,InitializeForm:function(Self) {
      /* null */
   }
   /// procedure TW3CustomForm.setCaption(Value: String)
   ///  [line: 82, column: 25, file: SmartCL.Forms]
   ,setCaption:function(Self, Value$6) {
      Self.FCaption = Value$6;
   }
   /// procedure TW3CustomForm.StyleTagObject()
   ///  [line: 69, column: 25, file: SmartCL.Forms]
   ,StyleTagObject:function(Self) {
      TW3CustomControl.StyleTagObject(Self);
      w3_setStyle(Self.FHandle,w3_CSSPrefix("Transform"),"none");
      TW3CustomControl.SetStyleClass(Self,"TW3CustomForm");
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,Create$19$:function($){return $.ClassType.Create$19.apply($.ClassType, arguments)}
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,GetEnabled:TW3CustomControl.GetEnabled
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
   ,InitializeForm$:function($){return $.ClassType.InitializeForm($)}
};
/// TW3Form = class (TW3CustomForm)
///  [line: 44, column: 3, file: SmartCL.Forms]
var TW3Form = {
   $ClassName:"TW3Form",
   $Parent:TW3CustomForm
   ,$Init:function ($) {
      TW3CustomForm.$Init($);
   }
   ,Destroy:TW3CustomForm.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,StyleTagObject:TW3CustomForm.StyleTagObject
   ,Create$19:TW3CustomForm.Create$19
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,GetEnabled:TW3CustomControl.GetEnabled
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
   ,InitializeForm:TW3CustomForm.InitializeForm
};
/// TW3ScrollInfo = class (TW3OwnedObject)
///  [line: 317, column: 3, file: SmartCL.Components]
var TW3ScrollInfo = {
   $ClassName:"TW3ScrollInfo",
   $Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
   }
   /// function TW3ScrollInfo.AcceptParent(aObject: TObject) : Boolean
   ///  [line: 1532, column: 24, file: SmartCL.Components]
   ,AcceptParent:function(Self, aObject$1) {
      return (aObject$1!==null)&&$Is(aObject$1,TW3TagObj);
   }
   /// function TW3ScrollInfo.GetScrollHeight() : Integer
   ///  [line: 1578, column: 24, file: SmartCL.Components]
   ,GetScrollHeight:function(Self) {
      var Result = 0;
      var mRef = undefined;
      mRef = $As(Self.FOwner,TW3TagObj).FHandle;
      if (mRef) {
         Result = TVariant.AsInteger(mRef.scrollHeight);
      } else {
         EW3TagObj.RaiseCntErrMethod("TW3ScrollInfo.GetScrollHeight",Self,"invalid owner handle error");
      }
      return Result
   }
   /// function TW3ScrollInfo.GetScrollLeft() : Integer
   ///  [line: 1588, column: 24, file: SmartCL.Components]
   ,GetScrollLeft:function(Self) {
      var Result = 0;
      var mRef$1 = undefined;
      mRef$1 = $As(Self.FOwner,TW3TagObj).FHandle;
      if (mRef$1) {
         Result = TVariant.AsInteger(mRef$1.scrollLeft);
      } else {
         EW3TagObj.RaiseCntErrMethod("TW3ScrollInfo.GetScrollLeft",Self,"invalid owner handle error");
      }
      return Result
   }
   /// function TW3ScrollInfo.GetScrollTop() : Integer
   ///  [line: 1598, column: 24, file: SmartCL.Components]
   ,GetScrollTop:function(Self) {
      var Result = 0;
      var mRef$2 = undefined;
      mRef$2 = $As(Self.FOwner,TW3TagObj).FHandle;
      if (mRef$2) {
         Result = TVariant.AsInteger(mRef$2.scrollTop);
      } else {
         EW3TagObj.RaiseCntErrMethod("TW3ScrollInfo.GetScrollTop",Self,"invalid owner handle error");
      }
      return Result
   }
   /// function TW3ScrollInfo.GetScrollWidth() : Integer
   ///  [line: 1568, column: 24, file: SmartCL.Components]
   ,GetScrollWidth:function(Self) {
      var Result = 0;
      var mRef$3 = undefined;
      mRef$3 = $As(Self.FOwner,TW3TagObj).FHandle;
      if (mRef$3) {
         Result = TVariant.AsInteger(mRef$3.scrollWidth);
      } else {
         EW3TagObj.RaiseCntErrMethod("TW3ScrollInfo.GetScrollWidth",Self,"invalid owner handle error");
      }
      return Result
   }
   /// procedure TW3ScrollInfo.ScrollTo(aLeft: Integer; aTop: Integer)
   ///  [line: 1608, column: 25, file: SmartCL.Components]
   ,ScrollTo:function(Self, aLeft$4, aTop$4) {
      var mRef$4 = undefined;
      mRef$4 = $As(Self.FOwner,TW3TagObj).FHandle;
      if (mRef$4) {
         mRef$4.scrollLeft = aLeft$4;
         mRef$4.scrollTop = aTop$4;
      } else {
         EW3TagObj.RaiseCntErrMethod("TW3ScrollInfo.ScrollTo",Self,"invalid owner handle error");
      }
   }
   ,Destroy:TObject.Destroy
   ,AcceptParent$:function($){return $.ClassType.AcceptParent.apply($.ClassType, arguments)}
   ,Create$4:TW3OwnedObject.Create$4
};
/// TW3GraphicControl = class (TW3CustomControl)
///  [line: 603, column: 3, file: SmartCL.Components]
var TW3GraphicControl = {
   $ClassName:"TW3GraphicControl",
   $Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FCanvas = $.FContext$2 = $.FOnPaint = null;
      $.FDirty$1 = false;
   }
   /// procedure TW3GraphicControl.FinalizeObject()
   ///  [line: 1632, column: 29, file: SmartCL.Components]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FCanvas);
      TObject.Free(Self.FContext$2);
      TW3CustomControl.FinalizeObject(Self);
   }
   /// procedure TW3GraphicControl.InitializeObject()
   ///  [line: 1625, column: 29, file: SmartCL.Components]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FContext$2 = TW3ControlGraphicContext.Create$30($New(TW3ControlGraphicContext),Self.FHandle);
      Self.FCanvas = TW3Canvas.Create$32($New(TW3Canvas),Self.FContext$2);
   }
   /// procedure TW3GraphicControl.Invalidate()
   ///  [line: 1685, column: 29, file: SmartCL.Components]
   ,Invalidate:function(Self) {
      if (!Self.FDirty$1) {
         Self.FDirty$1 = true;
         TW3AnimationFrame.ScheduleRefresh(Self);
      }
   }
   /// function TW3GraphicControl.MakeElementTagObj() : THandle
   ///  [line: 1665, column: 28, file: SmartCL.Components]
   ,MakeElementTagObj:function(Self) {
      return w3_createHtmlElement("canvas");
   }
   /// procedure TW3GraphicControl.Paint()
   ///  [line: 1670, column: 29, file: SmartCL.Components]
   ,Paint:function(Self) {
      if (Self.FOnPaint) {
         Self.FOnPaint(Self,Self.FCanvas);
      }
   }
   /// procedure TW3GraphicControl.Refresh()
   ///  [line: 1693, column: 29, file: SmartCL.Components]
   ,Refresh:function(Self) {
      Self.FDirty$1 = false;
      if ((((!TW3TagObj.GetUpdating(Self))&&(Self.FCanvas!==null))&&(Self.FContext$2!==null))&&TW3MovableControl.GetVisible(Self)) {
         TW3GraphicControl.Paint(Self);
      }
   }
   /// procedure TW3GraphicControl.Resize()
   ///  [line: 1676, column: 29, file: SmartCL.Components]
   ,Resize:function(Self) {
      TW3MovableControl.Resize(Self);
      w3_setAttrib(Self.FHandle,"width",w3_getStyle(Self.FHandle,"width"));
      w3_setAttrib(Self.FHandle,"height",w3_getStyle(Self.FHandle,"height"));
   }
   /// procedure TW3GraphicControl.SetHeight(aValue: Integer)
   ///  [line: 1656, column: 29, file: SmartCL.Components]
   ,SetHeight:function(Self, aValue$50) {
      TW3MovableControl.SetHeight(Self,aValue$50);
      if (Self.FHandle) {
         w3_setAttrib(Self.FHandle,"height",TInteger.ToPxStr(aValue$50));
      } else {
         EW3TagObj.RaiseCntErrMethod("TW3GraphicControl.SetHeight",Self,"invalid control handle error");
      }
   }
   /// procedure TW3GraphicControl.SetWidth(aValue: Integer)
   ///  [line: 1647, column: 29, file: SmartCL.Components]
   ,SetWidth:function(Self, aValue$51) {
      TW3MovableControl.SetWidth(Self,aValue$51);
      if (Self.FHandle) {
         w3_setAttrib(Self.FHandle,"width",TInteger.ToPxStr(aValue$51));
      } else {
         EW3TagObj.RaiseCntErrMethod("TW3GraphicControl.SetWidth",Self,"invalid control handle error");
      }
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,StyleTagObject:TW3CustomControl.StyleTagObject
   ,Create$19:TW3CustomControl.Create$19
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight$:function($){return $.ClassType.SetHeight.apply($.ClassType, arguments)}
   ,SetWidth$:function($){return $.ClassType.SetWidth.apply($.ClassType, arguments)}
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,GetEnabled:TW3CustomControl.GetEnabled
   ,Invalidate$:function($){return $.ClassType.Invalidate($)}
   ,SetEnabled:TW3CustomControl.SetEnabled
};
/// TW3ControlSizeInfo = record
///  [line: 107, column: 3, file: SmartCL.Components]
function Copy$TW3ControlSizeInfo(s,d) {
   return d;
}
function Clone$TW3ControlSizeInfo($) {
   return {

   }
}
/// TW3CustomFont = class (TObject)
///  [line: 25, column: 3, file: SmartCL.Fonts]
var TW3CustomFont = {
   $ClassName:"TW3CustomFont",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FOnChange = null;
   }
   /// function TW3CustomFont.GetColor() : TColor
   ///  [line: 378, column: 24, file: SmartCL.Fonts]
   ,GetColor$1:function(Self) {
      var Result = {v:0};
      try {
         var mRef$5 = undefined;
         var mText$2 = "";
         mRef$5 = TW3CustomFont.GetHandle$4$(Self);
         if (mRef$5) {
            mText$2 = ""+w3_getCssStyle(mRef$5,"color");
            Result.v = StrToColor(mText$2);
         } else {
            throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3CustomFont.GetColor", TObject.ClassName(Self.ClassType), $R[4]]);
         }
      } finally {return Result.v}
   }
   /// function TW3CustomFont.GetName() : String
   ///  [line: 324, column: 24, file: SmartCL.Fonts]
   ,GetName:function(Self) {
      var Result = "";
      var mHandle = undefined;
      mHandle = TW3CustomFont.GetHandle$4$(Self);
      if (mHandle) {
         Result = ""+w3_getCssStyle(mHandle,"font-family");
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3CustomFont.GetName", TObject.ClassName(Self.ClassType), $R[4]]);
      }
      return Result
   }
   /// function TW3CustomFont.GetSize() : Integer
   ///  [line: 351, column: 24, file: SmartCL.Fonts]
   ,GetSize:function(Self) {
      var Result = 0;
      var mRef$6 = undefined;
      mRef$6 = TW3CustomFont.GetHandle$4$(Self);
      if (mRef$6) {
         Result = w3_getCssStyleAsInteger(mRef$6,"font-size");
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3CustomFont.GetSize", TObject.ClassName(Self.ClassType), $R[4]]);
      }
      return Result
   }
   /// function TW3CustomFont.GetWeight() : String
   ///  [line: 408, column: 24, file: SmartCL.Fonts]
   ,GetWeight:function(Self) {
      var Result = "";
      var mRef$7 = undefined;
      mRef$7 = TW3CustomFont.GetHandle$4$(Self);
      if (mRef$7) {
         Result = ""+w3_getCssStyle(mRef$7,"font-weight");
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3CustomFont.GetWeight", TObject.ClassName(Self.ClassType), $R[4]]);
      }
      return Result
   }
   /// procedure TW3CustomFont.SetColor(aNewColor: TColor)
   ///  [line: 393, column: 25, file: SmartCL.Fonts]
   ,SetColor$2:function(Self, aNewColor) {
      var mRef$8 = undefined;
      mRef$8 = TW3CustomFont.GetHandle$4$(Self);
      if (mRef$8) {
         w3_setCssStyle(mRef$8,"color",ColorToWebStr(aNewColor,255));
         if (Self.FOnChange) {
            Self.FOnChange(Self);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3CustomFont.SetColor", TObject.ClassName(Self.ClassType), $R[4]]);
      }
   }
   /// procedure TW3CustomFont.SetName(aNewName: String)
   ///  [line: 336, column: 25, file: SmartCL.Fonts]
   ,SetName$1:function(Self, aNewName) {
      var mHandle$1 = undefined;
      mHandle$1 = TW3CustomFont.GetHandle$4$(Self);
      if (mHandle$1) {
         w3_setCssStyle(mHandle$1,"font-family",aNewName);
         if (Self.FOnChange) {
            Self.FOnChange(Self);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3CustomFont.SetName", TObject.ClassName(Self.ClassType), $R[4]]);
      }
   }
   /// procedure TW3CustomFont.SetSize(aNewSize: Integer)
   ///  [line: 363, column: 25, file: SmartCL.Fonts]
   ,SetSize$5:function(Self, aNewSize) {
      var mRef$9 = undefined;
      mRef$9 = TW3CustomFont.GetHandle$4$(Self);
      if (mRef$9) {
         w3_setCssStyle(mRef$9,"font-size",TInteger.ToPxStr(aNewSize));
         if (Self.FOnChange) {
            Self.FOnChange(Self);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3CustomFont.SetSize", TObject.ClassName(Self.ClassType), $R[4]]);
      }
   }
   /// procedure TW3CustomFont.SetWeight(aNewWeight: String)
   ///  [line: 420, column: 25, file: SmartCL.Fonts]
   ,SetWeight:function(Self, aNewWeight) {
      var mRef$10 = undefined;
      mRef$10 = TW3CustomFont.GetHandle$4$(Self);
      if (mRef$10) {
         w3_setCssStyle(mRef$10,"font-weight",aNewWeight);
         if (Self.FOnChange) {
            Self.FOnChange(Self);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EW3FontError),$R[0],["TW3CustomFont.SetWeight", TObject.ClassName(Self.ClassType), $R[4]]);
      }
   }
   ,Destroy:TObject.Destroy
   ,GetHandle$4$:function($){return $.ClassType.GetHandle$4($)}
};
/// TW3ControlFont = class (TW3CustomFont)
///  [line: 275, column: 3, file: SmartCL.Components]
var TW3ControlFont = {
   $ClassName:"TW3ControlFont",
   $Parent:TW3CustomFont
   ,$Init:function ($) {
      TW3CustomFont.$Init($);
      $.FOwner$3 = null;
   }
   /// function TW3ControlFont.GetHandle() : THandle
   ///  [line: 1521, column: 25, file: SmartCL.Components]
   ,GetHandle$4:function(Self) {
      return Self.FOwner$3.FHandle;
   }
   /// constructor TW3ControlFont.Create(AOwner: TW3CustomControl)
   ///  [line: 1512, column: 28, file: SmartCL.Components]
   ,Create$36:function(Self, AOwner$4) {
      TObject.Create(Self);
      if (AOwner$4) {
         Self.FOwner$3 = AOwner$4;
      } else {
         EW3TagObj.RaiseCntErrMethod("TW3ControlFont.Create",Self,"Owner was nil error");
      }
      return Self
   }
   ,Destroy:TObject.Destroy
   ,GetHandle$4$:function($){return $.ClassType.GetHandle$4($)}
};
/// TW3ControlBackground = class (TW3OwnedObject)
///  [line: 286, column: 3, file: SmartCL.Components]
var TW3ControlBackground = {
   $ClassName:"TW3ControlBackground",
   $Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
   }
   /// function TW3ControlBackground.AcceptParent(aObject: TObject) : Boolean
   ///  [line: 939, column: 31, file: SmartCL.Components]
   ,AcceptParent:function(Self, aObject$2) {
      return (aObject$2!==null)&&$Is(aObject$2,TW3MovableControl);
   }
   /// procedure TW3ControlBackground.FromColor(const aValue: TColor)
   ///  [line: 963, column: 32, file: SmartCL.Components]
   ,FromColor$1:function(Self, aValue$52) {
      var mRef$11 = undefined;
      mRef$11 = $As(Self.FOwner,TW3MovableControl).FHandle;
      mRef$11.style["backgroundColor"] = ColorToWebStr(aValue$52,255);
   }
   ,Destroy:TObject.Destroy
   ,AcceptParent$:function($){return $.ClassType.AcceptParent.apply($.ClassType, arguments)}
   ,Create$4:TW3OwnedObject.Create$4
};
/// TW3Constraints = class (TW3OwnedObject)
///  [line: 297, column: 3, file: SmartCL.Components]
var TW3Constraints = {
   $ClassName:"TW3Constraints",
   $Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
   }
   /// function TW3Constraints.AcceptParent(aObject: TObject) : Boolean
   ///  [line: 858, column: 26, file: SmartCL.Components]
   ,AcceptParent:function(Self, aObject$3) {
      return (aObject$3!==null)&&$Is(aObject$3,TW3TagObj);
   }
   /// function TW3Constraints.GetMaxHeight() : Integer
   ///  [line: 908, column: 26, file: SmartCL.Components]
   ,GetMaxHeight:function(Self) {
      var Result = 0;
      var mRef$12 = undefined;
      mRef$12 = $As(Self.FOwner,TW3MovableControl).FHandle;
      if (mRef$12) {
         Result = w3_getStyleAsInt(mRef$12,"max-height");
      }
      return Result
   }
   /// function TW3Constraints.GetMaxWidth() : Integer
   ///  [line: 899, column: 26, file: SmartCL.Components]
   ,GetMaxWidth:function(Self) {
      var Result = 0;
      var mRef$13 = undefined;
      mRef$13 = $As(Self.FOwner,TW3MovableControl).FHandle;
      if (mRef$13) {
         Result = w3_getStyleAsInt(mRef$13,"max-width");
      }
      return Result
   }
   /// function TW3Constraints.GetMinHeight() : Integer
   ///  [line: 872, column: 26, file: SmartCL.Components]
   ,GetMinHeight:function(Self) {
      var Result = 0;
      var mRef$14 = undefined;
      mRef$14 = $As(Self.FOwner,TW3MovableControl).FHandle;
      if (mRef$14) {
         Result = w3_getStyleAsInt(mRef$14,"min-height");
      }
      return Result
   }
   /// function TW3Constraints.GetMinWidth() : Integer
   ///  [line: 863, column: 26, file: SmartCL.Components]
   ,GetMinWidth:function(Self) {
      var Result = 0;
      var mRef$15 = undefined;
      mRef$15 = $As(Self.FOwner,TW3MovableControl).FHandle;
      if (mRef$15) {
         Result = w3_getStyleAsInt(mRef$15,"min-width");
      }
      return Result
   }
   /// procedure TW3Constraints.SetMaxHeight(aValue: Integer)
   ///  [line: 926, column: 26, file: SmartCL.Components]
   ,SetMaxHeight:function(Self, aValue$53) {
      var mRef$16 = undefined;
      mRef$16 = $As(Self.FOwner,TW3MovableControl).FHandle;
      if (mRef$16) {
         mRef$16.style["max-width"] = TInteger.ToPxStr(aValue$53);
      }
   }
   /// procedure TW3Constraints.SetMaxWidth(aValue: Integer)
   ///  [line: 917, column: 26, file: SmartCL.Components]
   ,SetMaxWidth:function(Self, aValue$54) {
      var mRef$17 = undefined;
      mRef$17 = $As(Self.FOwner,TW3MovableControl).FHandle;
      if (mRef$17) {
         mRef$17.style["max-width"] = TInteger.ToPxStr(aValue$54);
      }
   }
   /// procedure TW3Constraints.SetMinHeight(aValue: Integer)
   ///  [line: 890, column: 26, file: SmartCL.Components]
   ,SetMinHeight:function(Self, aValue$55) {
      var mRef$18 = undefined;
      mRef$18 = $As(Self.FOwner,TW3MovableControl).FHandle;
      if (mRef$18) {
         mRef$18.style["min-height"] = TInteger.ToPxStr(aValue$55);
      }
   }
   /// procedure TW3Constraints.SetMinWidth(aValue: Integer)
   ///  [line: 881, column: 26, file: SmartCL.Components]
   ,SetMinWidth:function(Self, aValue$56) {
      var mRef$19 = undefined;
      mRef$19 = $As(Self.FOwner,TW3MovableControl).FHandle;
      if (mRef$19) {
         mRef$19.style["min-width"] = TInteger.ToPxStr(aValue$56);
      }
   }
   ,Destroy:TObject.Destroy
   ,AcceptParent$:function($){return $.ClassType.AcceptParent.apply($.ClassType, arguments)}
   ,Create$4:TW3OwnedObject.Create$4
};
/// TW3AttrAccess = class (TObject)
///  [line: 145, column: 3, file: SmartCL.Components]
var TW3AttrAccess = {
   $ClassName:"TW3AttrAccess",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FHandle$4 = undefined;
   }
   /// constructor TW3AttrAccess.Create(const aHandle: THandle)
   ///  [line: 692, column: 27, file: SmartCL.Components]
   ,Create$37:function(Self, aHandle$1) {
      TObject.Create(Self);
      if (TBufferHandleHelper$Valid(aHandle$1)) {
         Self.FHandle$4 = aHandle$1;
      } else {
         throw Exception.Create($New(Exception),$R[12]);
      }
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TW3AnimationFrame = class (TObject)
///  [line: 636, column: 3, file: SmartCL.Components]
var TW3AnimationFrame = {
   $ClassName:"TW3AnimationFrame",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// procedure TW3AnimationFrame.Perform()
   ///  [line: 832, column: 35, file: SmartCL.Components]
   ,Perform:function() {
      var i$2 = 0;
      var callbacks = [];
      var controls = [];
      if (vScheduledCallbacks.length>0) {
         callbacks = vScheduledCallbacks;
         vScheduledCallbacks = [];
         var $temp21;
         for(i$2 = 0,$temp21 = callbacks.length;i$2<$temp21;i$2++) {
            callbacks[i$2]();
         }
      }
      if (vScheduledControls.length>0) {
         controls = vScheduledControls;
         vScheduledControls = [];
         var $temp22;
         for(i$2 = 0,$temp22 = controls.length;i$2<$temp22;i$2++) {
            TW3GraphicControl.Refresh(controls[i$2]);
         }
      }
      var $temp23;
      for(i$2 = 0,$temp23 = vOnPerform.length;i$2<$temp23;i$2++) {
         vOnPerform[i$2]();
      }
   }
   /// procedure TW3AnimationFrame.ScheduleRefresh(control: TW3GraphicControl)
   ///  [line: 818, column: 35, file: SmartCL.Components]
   ,ScheduleRefresh:function(control) {
      vScheduledControls.push(control);
      if (!vPending) {
         w3_RequestAnimationFrame(TW3AnimationFrame.Perform);
      }
   }
   ,Destroy:TObject.Destroy
};
/// TShiftStateEnum enumeration
///  [line: 41, column: 3, file: SmartCL.Components]
var TShiftStateEnum = [ "ssShift", "ssAlt", "ssCtrl", "ssMeta", "ssLeft", "ssRight", "ssMiddle" ];
/// TShiftState = class (TObject)
///  [line: 47, column: 3, file: SmartCL.Components]
var TShiftState = {
   $ClassName:"TShiftState",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FEvent = $.FMouseEvent = null;
      $.FMouseButtons = 0;
   }
   /// function TShiftState.CheckShiftStateEnum(value: TShiftStateEnum) : Boolean
   ///  [line: 765, column: 22, file: SmartCL.Components]
   ,CheckShiftStateEnum:function(Self, value$3) {
      var Result = false;
      if (Self.FEvent===null) {
         Result = false;
      } else {
         switch (value$3) {
            case 0 :
               Result = Self.FEvent.shiftKey;
               break;
            case 1 :
               Result = Self.FEvent.altKey;
               break;
            case 2 :
               Result = Self.FEvent.ctrlKey;
               break;
            case 3 :
               Result = Self.FEvent.metaKey;
               break;
            case 4 :
               Result = ((Self.FMouseButtons&1)!=0);
               break;
            case 5 :
               Result = ((Self.FMouseButtons&4)!=0);
               break;
            case 6 :
               Result = ((Self.FMouseButtons&2)!=0);
               break;
         }
      }
      return Result
   }
   /// function TShiftState.Current() : TShiftState
   ///  [line: 793, column: 28, file: SmartCL.Components]
   ,Current$1:function() {
      var Result = null;
      if (vCurrent===null) {
         vCurrent = TObject.Create($New(TShiftState));
      }
      Result = vCurrent;
      return Result
   }
   /// procedure TShiftState.SetMouseEvent(evt: JMouseEvent)
   ///  [line: 787, column: 23, file: SmartCL.Components]
   ,SetMouseEvent:function(Self, evt$8) {
      Self.FEvent = evt$8;
      Self.FMouseEvent = evt$8;
   }
   ,Destroy:TObject.Destroy
};
/// TMouseButton enumeration
///  [line: 39, column: 3, file: SmartCL.Components]
var TMouseButton = [ "mbLeft", "mbMiddle", "mbRight" ];
/// TCustomAppContainer = class (TW3Component)
///  [line: 242, column: 3, file: SmartCL.Components]
var TCustomAppContainer = {
   $ClassName:"TCustomAppContainer",
   $Parent:TW3Component
   ,$Init:function ($) {
      TW3Component.$Init($);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3TagObj.AfterUpdate
   ,FinalizeObject:TW3Component.FinalizeObject
   ,InitializeObject:TW3Component.InitializeObject
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,StyleTagObject:TW3TagObj.StyleTagObject
   ,Create$19:TW3Component.Create$19
};
/// TDocumentBody = class (TCustomAppContainer)
///  [line: 250, column: 3, file: SmartCL.Components]
var TDocumentBody = {
   $ClassName:"TDocumentBody",
   $Parent:TCustomAppContainer
   ,$Init:function ($) {
      TCustomAppContainer.$Init($);
   }
   /// function TDocumentBody.GetClientHeight() : Integer
   ///  [line: 1453, column: 24, file: SmartCL.Components]
   ,GetClientHeight:function(Self) {
      var Result = 0;
      function getUniversalHeight() {
         var Result = 0;
         var mRef$20 = undefined;
         var mHtml = undefined;
         mRef$20 = Self.FHandle;
         
      mHtml = document.documentElement;
      Result = Math.max(
        (mRef$20).scrollHeight,
        (mRef$20).offsetHeight,
        (mHtml).clientHeight,
        (mHtml).scrollHeight,
        (mHtml).offsetHeight );
    return Result
      };
      
    Result = document.body.height;
  if (TVariant.IsNull(Result)||TVariant.IsNAN(Result)) {
         Result = getUniversalHeight();
      }
      return Result
   }
   /// function TDocumentBody.GetClientWidth() : Integer
   ///  [line: 1421, column: 24, file: SmartCL.Components]
   ,GetClientWidth:function(Self) {
      var Result = 0;
      function getUniversalWidth() {
         var Result = 0;
         var mHTML = undefined;
         var mRef$21 = undefined;
         mRef$21 = Self.FHandle;
         
      mHTML = document.documentElement;
      Result = Math.max(
        (mRef$21).scrollWidth,
        (mRef$21).offsetWidth,
        (mHTML).clientWidth,
        (mHTML).scrollWidth,
        (mHTML).offsetWidth );
    return Result
      };
      
    Result = document.body.width;
  if (TVariant.IsNull(Result)||TVariant.IsNAN(Result)) {
         Result = getUniversalWidth();
      }
      return Result
   }
   /// function TDocumentBody.GetHeight() : Integer
   ///  [line: 1500, column: 24, file: SmartCL.Components]
   ,GetHeight$5:function(Self) {
      var Result = 0;
      if (window.innerHeight) {
         Result = parseInt(window.innerHeight,10);
      } else {
         Result = TDocumentBody.GetClientHeight(Self);
      }
      return Result
   }
   /// function TDocumentBody.GetWidth() : Integer
   ///  [line: 1493, column: 24, file: SmartCL.Components]
   ,GetWidth$5:function(Self) {
      var Result = 0;
      if (window.innerWidth) {
         Result = parseInt(window.innerWidth,10);
      } else {
         Result = TDocumentBody.GetClientWidth(Self);
      }
      return Result
   }
   /// function TDocumentBody.makeElementTagId() : String
   ///  [line: 1392, column: 24, file: SmartCL.Components]
   ,MakeElementTagId:function(Self) {
      return "";
   }
   /// function TDocumentBody.makeElementTagObj() : THandle
   ///  [line: 1416, column: 24, file: SmartCL.Components]
   ,MakeElementTagObj:function(Self) {
      return document.body;
   }
   /// procedure TDocumentBody.StyleTagObject()
   ///  [line: 1387, column: 25, file: SmartCL.Components]
   ,StyleTagObject:function(Self) {
      /* null */
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3TagObj.AfterUpdate
   ,FinalizeObject:TW3Component.FinalizeObject
   ,InitializeObject:TW3Component.InitializeObject
   ,MakeElementTagId$:function($){return $.ClassType.MakeElementTagId($)}
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,Create$19:TW3Component.Create$19
};
/// EW3TagObj = class (EW3Exception)
///  [line: 31, column: 3, file: SmartCL.Components]
var EW3TagObj = {
   $ClassName:"EW3TagObj",
   $Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   /// procedure EW3TagObj.RaiseCntErrMethod(methName: String; instance: TObject; msg: String)
   ///  [line: 755, column: 27, file: SmartCL.Components]
   ,RaiseCntErrMethod:function(methName, instance, msg) {
      throw EW3Exception.CreateFmt($New(EW3TagObj),$R[0],[methName, (instance!==null)?TObject.ClassName(instance.ClassType):"nil", msg]);
   }
   ,Destroy:Exception.Destroy
};
/// TW3StreamOrientation enumeration
///  [line: 324, column: 3, file: System.Interop]
var TW3StreamOrientation = [ "soFromStart", "soFromCurrent" ];
/// TStream = class (TObject)
///  [line: 333, column: 3, file: System.Interop]
var TStream = {
   $ClassName:"TStream",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   ,Destroy:TObject.Destroy
   ,Advance$:function($){return $.ClassType.Advance.apply($.ClassType, arguments)}
   ,getBuffer$:function($){return $.ClassType.getBuffer($)}
   ,getHandle$:function($){return $.ClassType.getHandle($)}
   ,getPosition$:function($){return $.ClassType.getPosition($)}
   ,getSize$:function($){return $.ClassType.getSize($)}
   ,Read$1$:function($){return $.ClassType.Read$1.apply($.ClassType, arguments)}
   ,setPosition$:function($){return $.ClassType.setPosition.apply($.ClassType, arguments)}
   ,setSize$:function($){return $.ClassType.setSize.apply($.ClassType, arguments)}
   ,Write$1$:function($){return $.ClassType.Write$1.apply($.ClassType, arguments)}
};
TStream.$Intf={
   IStreamAccess:[TStream.getBuffer,TStream.getPosition,TStream.setPosition,TStream.Advance]
}
/// TMemoryStream = class (TStream)
///  [line: 358, column: 3, file: System.Interop]
var TMemoryStream = {
   $ClassName:"TMemoryStream",
   $Parent:TStream
   ,$Init:function ($) {
      TStream.$Init($);
      $.FBuffer = null;
      $.FPosition = 0;
   }
   /// procedure TMemoryStream.Advance(Bytes: Integer)
   ///  [line: 1337, column: 25, file: System.Interop]
   ,Advance:function(Self, Bytes$1) {
      (Self.FPosition+= Bytes$1);
   }
   /// constructor TMemoryStream.Create()
   ///  [line: 1241, column: 27, file: System.Interop]
   ,Create$40:function(Self) {
      TObject.Create(Self);
      Self.FBuffer = TMemory.Create$44($New(TMemory),null);
      Self.FPosition = 0;
      return Self
   }
   /// destructor TMemoryStream.Destroy()
   ///  [line: 1248, column: 26, file: System.Interop]
   ,Destroy:function(Self) {
      TObject.Free(Self.FBuffer);
      TObject.Destroy(Self);
   }
   /// function TMemoryStream.getBuffer() : TMemory
   ///  [line: 1275, column: 24, file: System.Interop]
   ,getBuffer:function(Self) {
      return Self.FBuffer;
   }
   /// function TMemoryStream.getHandle() : TMemoryHandle
   ///  [line: 1280, column: 24, file: System.Interop]
   ,getHandle:function(Self) {
      return TMemory.getHandle$2(Self.FBuffer);
   }
   /// function TMemoryStream.getPosition() : Integer
   ///  [line: 1332, column: 24, file: System.Interop]
   ,getPosition:function(Self) {
      return TInteger.EnsureRange(Self.FPosition,0,TStream.getSize$(Self));
   }
   /// function TMemoryStream.getSize() : Integer
   ///  [line: 1327, column: 24, file: System.Interop]
   ,getSize:function(Self) {
      return TMemory.a$26(Self.FBuffer);
   }
   /// function TMemoryStream.Read(ByteLen: Integer) : TByteArray
   ///  [line: 1307, column: 24, file: System.Interop]
   ,Read$1:function(Self, ByteLen) {
      var Result = [];
      Result = TMemory.ReadBytes(Self.FBuffer,TStream.getPosition$(Self),ByteLen);
      TStream.Advance$(Self,Result.length);
      return Result
   }
   /// procedure TMemoryStream.setPosition(Offset: Integer)
   ///  [line: 1342, column: 25, file: System.Interop]
   ,setPosition:function(Self, Offset$4) {
      Self.FPosition = TInteger.EnsureRange(Offset$4,(-1),(TMemory.a$26(Self.FBuffer)-1));
   }
   /// procedure TMemoryStream.setSize(Value: Integer)
   ///  [line: 1285, column: 25, file: System.Interop]
   ,setSize:function(Self, Value$7) {
      if (Value$7!=TMemory.a$26(Self.FBuffer)) {
         if (Value$7<=0) {
            TMemory.Release$2(Self.FBuffer);
         } else {
            if (Value$7<TMemory.a$26(Self.FBuffer)) {
               TMemory.Shrink(Self.FBuffer,(TMemory.a$26(Self.FBuffer)-Value$7));
            } else if (Value$7>TMemory.a$26(Self.FBuffer)) {
               TMemory.Grow(Self.FBuffer,(Value$7-TMemory.a$26(Self.FBuffer)));
            }
         }
         if (!TMemory.a$26(Self.FBuffer)) {
            Self.FPosition = -1;
         } else if (Self.FPosition>TMemory.a$26(Self.FBuffer)) {
            Self.FPosition = TMemory.a$26(Self.FBuffer)-1;
         }
      }
   }
   /// procedure TMemoryStream.Write(const Data: TByteArray)
   ///  [line: 1313, column: 25, file: System.Interop]
   ,Write$1:function(Self, Data$1) {
      if (!TMemory.a$26(Self.FBuffer)) {
         if (Data$1.length>0) {
            TMemory.Allocate$2(Self.FBuffer,Data$1.length);
         }
      }
      if (Self.FPosition==TMemory.a$26(Self.FBuffer)) {
         TMemory.AppendBytes(Self.FBuffer,Data$1);
      } else {
         TMemory.Write$7(Self.FBuffer,TStream.getPosition$(Self),Data$1);
      }
      TStream.Advance$(Self,Data$1.length);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Advance$:function($){return $.ClassType.Advance.apply($.ClassType, arguments)}
   ,getBuffer$:function($){return $.ClassType.getBuffer($)}
   ,getHandle$:function($){return $.ClassType.getHandle($)}
   ,getPosition$:function($){return $.ClassType.getPosition($)}
   ,getSize$:function($){return $.ClassType.getSize($)}
   ,Read$1$:function($){return $.ClassType.Read$1.apply($.ClassType, arguments)}
   ,setPosition$:function($){return $.ClassType.setPosition.apply($.ClassType, arguments)}
   ,setSize$:function($){return $.ClassType.setSize.apply($.ClassType, arguments)}
   ,Write$1$:function($){return $.ClassType.Write$1.apply($.ClassType, arguments)}
};
TMemoryStream.$Intf={
   IStreamAccess:[TMemoryStream.getBuffer,TMemoryStream.getPosition,TMemoryStream.setPosition,TMemoryStream.Advance]
}
/// TStreamWriter = class (TObject)
///  [line: 392, column: 3, file: System.Interop]
var TStreamWriter = {
   $ClassName:"TStreamWriter",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FStream = null;
   }
   /// constructor TStreamWriter.Create(AStream: TStream)
   ///  [line: 1190, column: 27, file: System.Interop]
   ,Create$42:function(Self, AStream) {
      TObject.Create(Self);
      Self.FStream = AStream;
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TStreamReader = class (TObject)
///  [line: 406, column: 3, file: System.Interop]
var TStreamReader = {
   $ClassName:"TStreamReader",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FStream$1 = null;
   }
   /// constructor TStreamReader.Create(AStream: TStream)
   ///  [line: 1155, column: 27, file: System.Interop]
   ,Create$43:function(Self, AStream$1) {
      TObject.Create(Self);
      Self.FStream$1 = AStream$1;
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// function TMemoryHandleHelper.Valid(const Self: TMemoryHandle) : Boolean
///  [line: 480, column: 30, file: System.Interop]
function TMemoryHandleHelper$Valid$1(Self$8) {
   var Result = false;
   
    Result = !( (Self$8 == undefined) || (Self$8 == null) );
  return Result
}
/// function TMemoryHandleHelper.Defined(const Self: TMemoryHandle) : Boolean
///  [line: 487, column: 30, file: System.Interop]
function TMemoryHandleHelper$Defined(Self$9) {
   var Result = false;
   
    Result = !(self == undefined);
  return Result
}
/// TMemory = class (TObject)
///  [line: 175, column: 3, file: System.Interop]
var TMemory = {
   $ClassName:"TMemory",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FCacheSize = $.FSize = 0;
      $.FDataView = null;
      $.Fhandle = undefined;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 190, column: 35, file: System.Interop]
   ,a$26:function(Self) {
      return Self.FSize;
   }
   /// function TMemory.AllocArrayObj(byteSize: Integer) : THandle
   ///  [line: 2142, column: 18, file: System.Interop]
   ,AllocArrayObj:function(Self, byteSize) {
      var Result = undefined;
      try {
         Result = new Uint8ClampedArray(TInteger.ToNearest(byteSize,16));
      } catch ($e) {
         var e$6 = $W($e);
         throw EW3Exception.CreateFmt($New(EMemory),"Failed to allocate buffer, system threw \"%s\"",[e$6.FMessage]);
      }
      return Result
   }
   /// procedure TMemory.Allocate(const ByteSize: Integer)
   ///  [line: 1647, column: 19, file: System.Interop]
   ,Allocate$2:function(Self, ByteSize) {
      if (Self.Fhandle) {
         TMemory.Release$2(Self);
      }
      if (ByteSize>0) {
         Self.FSize = ByteSize;
         Self.Fhandle = TMemory.AllocArrayObj(Self,ByteSize+Self.FCacheSize);
         
      (Self.FDataView) = new DataView((Self.Fhandle).buffer);
          } else {
         throw Exception.Create($New(EMemory),"Failed to allocate buffer, invalid size error");
      }
   }
   /// procedure TMemory.AppendBytes(const Bytes: array of Byte)
   ///  [line: 2128, column: 19, file: System.Interop]
   ,AppendBytes:function(Self, Bytes$2) {
      var mLen = 0;
      var mOffset = 0;
      mLen = Bytes$2.length;
      if (mLen>0) {
         mOffset = TMemory.a$26(Self);
         TMemory.Grow(Self,mLen);
         Self.Fhandle.set(Bytes$2,mOffset);
      }
   }
   /// procedure TMemory.CopyFrom(Raw: TMemoryHandle; Offset: Integer; ByteLen: Integer)
   ///  [line: 2033, column: 19, file: System.Interop]
   ,CopyFrom$2:function(Self, Raw, Offset$5, ByteLen$1) {
      if (TMemoryHandleHelper$Valid$1(Raw)) {
         if (TMemory.OffsetInRange(Self,Offset$5)) {
            if (ByteLen$1>0) {
               TMemory.Move$2(Self.ClassType,Raw,0,TMemory.getHandle$2(Self),Offset$5,ByteLen$1);
            }
         } else {
            throw EW3Exception.CreateFmt($New(EMemory),"Cut memory failed, invalid offset. Expected %d..%d not %d",[0, Self.FSize-1, Offset$5]);
         }
      } else {
         throw Exception.Create($New(EMemory),"CopyFrom failed, invalid source handle error");
      }
   }
   /// procedure TMemory.CopyFrom(Buffer: TMemory; Offset: Integer; ByteLen: Integer)
   ///  [line: 2024, column: 19, file: System.Interop]
   ,CopyFrom$1:function(Self, Buffer$1, Offset$6, ByteLen$2) {
      if (Buffer$1!==null) {
         TMemory.CopyFrom$2(Self,TMemory.getHandle$2(Buffer$1),Offset$6,ByteLen$2);
      } else {
         throw Exception.Create($New(EMemory),"CopyFrom failed, source instance was NIL error");
      }
   }
   /// constructor TMemory.Create(aHandle: TMemoryHandle)
   ///  [line: 1383, column: 21, file: System.Interop]
   ,Create$44:function(Self, aHandle$2) {
      var mSignature = "";
      TObject.Create(Self);
      Self.FCacheSize = 4096;
      if (TMemoryHandleHelper$Defined(aHandle$2)&&TMemoryHandleHelper$Valid$1(aHandle$2)) {
         if (aHandle$2.toString) {
            mSignature = ""+aHandle$2.toString();
            if (SameText(mSignature,"[object Uint8Array]")||SameText(mSignature,"[object Uint8ClampedArray]")) {
               Self.Fhandle = aHandle$2;
               Self.FSize = parseInt(aHandle$2.length,10);
               
          (Self.FDataView) = new DataView((Self.Fhandle).buffer);
                    } else {
               throw Exception.Create($New(EMemory),"Invalid buffer type, expected handle of type Uint8[clamped]Array");
            }
         } else {
            throw Exception.Create($New(EMemory),"Invalid buffer type, expected handle of type Uint8[clamped]Array");
         }
      }
      return Self
   }
   /// destructor TMemory.Destroy()
   ///  [line: 1412, column: 20, file: System.Interop]
   ,Destroy:function(Self) {
      if (Self.Fhandle) {
         TMemory.Release$2(Self);
      }
      TObject.Destroy(Self);
   }
   /// function TMemory.getHandle() : THandle
   ///  [line: 1698, column: 18, file: System.Interop]
   ,getHandle$2:function(Self) {
      return Self.Fhandle;
   }
   /// procedure TMemory.Grow(const ByAmount: Integer)
   ///  [line: 2648, column: 19, file: System.Interop]
   ,Grow:function(Self, ByAmount) {
      var mNewBuffer = undefined;
      var mSize = 0;
      var mCacheLeft = 0;
      if (ByAmount>0) {
         mSize = Self.FSize+ByAmount;
         if (mSize>0) {
            if (Self.Fhandle) {
               mCacheLeft = Self.Fhandle.length-Self.FSize;
               if (ByAmount<mCacheLeft) {
                  Self.FSize+=ByAmount;
                  return;
               } else {
                  mNewBuffer = TMemory.AllocArrayObj(Self,mSize+Self.FCacheSize);
                  Self.FSize = mSize;
               }
            } else {
               mNewBuffer = TMemory.AllocArrayObj(Self,mSize+Self.FCacheSize);
               Self.FSize = mSize;
            }
            
      (Self.FDataView) = new DataView((mNewBuffer).buffer);
      if (Self.Fhandle) {
               mNewBuffer.set(Self.Fhandle,0);
            }
            Self.Fhandle = mNewBuffer;
         } else {
            TMemory.Release$2(Self);
         }
      }
   }
   /// procedure TMemory.Move(SourceBuffer: TMemoryHandle; start: Integer; TargetBuffer: TMemoryHandle; offset: Integer; len: Integer)
   ///  [line: 2223, column: 25, file: System.Interop]
   ,Move$2:function(Self, SourceBuffer, start, TargetBuffer, offset, len) {
      if ((((TMemoryHandleHelper$Valid$1(SourceBuffer)&&(start>=0))&&TMemoryHandleHelper$Valid$1(TargetBuffer))&&(offset>=0))&&(len>0)) {
         TargetBuffer.set(SourceBuffer.subarray(start,start+len),offset);
      }
   }
   /// function TMemory.OffsetInRange(Offset: Integer) : Boolean
   ///  [line: 1794, column: 18, file: System.Interop]
   ,OffsetInRange:function(Self, Offset$7) {
      var Result = false;
      var mSize$1 = 0;
      mSize$1 = Self.FSize;
      if (mSize$1>0) {
         Result = (Offset$7>=0)&&(Offset$7<=mSize$1);
      } else {
         Result = (Offset$7==0);
      }
      return Result
   }
   /// function TMemory.ReadBytes(Offset: Integer; ByteLen: Integer) : TByteArray
   ///  [line: 1768, column: 18, file: System.Interop]
   ,ReadBytes:function(Self, Offset$8, ByteLen$3) {
      var Result = [];
      var x$16 = 0;
      if (TMemory.OffsetInRange(Self,Offset$8)) {
         if ((Offset$8+ByteLen$3)<=Self.FSize) {
            var $temp24;
            for(x$16 = 0,$temp24 = ByteLen$3;x$16<$temp24;x$16++) {
               Result.push(Self.FDataView.getUint8(Offset$8+x$16));
            }
         } else {
            throw Exception.Create($New(EMemory),"Read failed, data length exceeds boundaries error");
         }
      } else {
         throw EW3Exception.CreateFmt($New(EMemory),$R[17],[Offset$8, 0, Self.FSize-1]);
      }
      return Result
   }
   /// procedure TMemory.Release()
   ///  [line: 1667, column: 19, file: System.Interop]
   ,Release$2:function(Self) {
      Self.Fhandle = null;
      Self.FDataView = null;
      Self.FSize = 0;
   }
   /// procedure TMemory.Shrink(const ByAmount: Integer)
   ///  [line: 2697, column: 19, file: System.Interop]
   ,Shrink:function(Self, ByAmount$1) {
      var mNewBuffer$1 = undefined;
      var mSize$2 = 0;
      mSize$2 = Self.FSize-ByAmount$1;
      if (mSize$2>0) {
         mNewBuffer$1 = TMemory.AllocArrayObj(Self,mSize$2+Self.FCacheSize);
         Self.FSize = mSize$2;
         
      (Self.FDataView) = new DataView((mNewBuffer$1).buffer);
    if (Self.Fhandle) {
            mNewBuffer$1.set(Self.Fhandle,0);
         }
         Self.Fhandle = mNewBuffer$1;
      } else {
         TMemory.Release$2(Self);
      }
   }
   /// function TMemory.ToStream() : TStream
   ///  [line: 1520, column: 18, file: System.Interop]
   ,ToStream$1:function(Self) {
      var Result = null;
      var mTargetBuffer = null;
      Result = TMemoryStream.Create$40($New(TMemoryStream));
      try {
         mTargetBuffer = $AsIntf(Result,"IStreamAccess")[0]();
         if (mTargetBuffer!==null) {
            TMemory.CopyFrom$1(mTargetBuffer,Self,0,Self.FSize);
         }
      } catch ($e) {
         var e$7 = $W($e);
         TObject.Free(Result);
         Result = null;
         throw $e;
      }
      return Result
   }
   /// procedure TMemory.Write(const Offset: Integer; const Data: TByteArray)
   ///  [line: 1806, column: 19, file: System.Interop]
   ,Write$7:function(Self, Offset$9, Data$2) {
      var mGrowth = 0;
      if (TMemory.OffsetInRange(Self,Offset$9)) {
         if (Data$2.length>0) {
            if ((Offset$9+Data$2.length)>(Self.FSize-1)) {
               mGrowth = (Offset$9+Data$2.length)-Self.FSize;
            }
            if (mGrowth>0) {
               TMemory.Grow(Self,mGrowth);
            }
            Self.Fhandle.set(Data$2,Offset$9);
         }
      } else {
         throw EW3Exception.CreateFmt($New(EMemory),"Write bytearray failed, invalid offset. Expected %d..%d not %d",[0, Self.FSize-1, Offset$9]);
      }
   }
   /// procedure TMemory.Write(const Offset: Integer; const Data: String)
   ///  [line: 1878, column: 19, file: System.Interop]
   ,Write$5:function(Self, Offset$10, Data$3) {
      var mGrowth$1 = 0;
      var x$17 = 0;
      if (Data$3.length>0) {
         if (TMemory.OffsetInRange(Self,Offset$10)) {
            if ((Offset$10+Data$3.length)>(Self.FSize-1)) {
               mGrowth$1 = (Offset$10+Data$3.length)-Self.FSize;
            }
            if (mGrowth$1>0) {
               TMemory.Grow(Self,mGrowth$1);
            }
            var $temp25;
            for(x$17 = 0,$temp25 = Data$3.length;x$17<$temp25;x$17++) {
               Self.FDataView.setUint8(Offset$10+x$17,TDatatype.CharToByte(TDatatype,Data$3.charAt(x$17)));
            }
         } else {
            throw EW3Exception.CreateFmt($New(EMemory),"Write string failed, invalid offset. Expected %d..%d not %d",[0, Self.FSize-1, Offset$10]);
         }
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
};
/// TDatatype = class (TObject)
///  [line: 115, column: 3, file: System.Interop]
var TDatatype = {
   $ClassName:"TDatatype",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TDatatype.CharToByte(const Value: String) : Byte
   ///  [line: 999, column: 26, file: System.Interop]
   ,CharToByte:function(Self, Value$8) {
      var Result = 0;
      
    Result = (Value$8).charCodeAt(0);
  return Result
   }
   ,Destroy:TObject.Destroy
};
/// function TBufferHandleHelper.Valid(const Self: TBufferHandle) : Boolean
///  [line: 462, column: 30, file: System.Interop]
function TBufferHandleHelper$Valid(Self$10) {
   var Result = false;
   
    Result = !( (Self$10 == undefined) || (Self$10 == null) );
  return Result
}
/// EMemory = class (EW3Exception)
///  [line: 174, column: 3, file: System.Interop]
var EMemory = {
   $ClassName:"EMemory",
   $Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
function setupLUT() {
   
    __CONV_BUFFER = new ArrayBuffer(16);
    __CONV_VIEW   = new DataView(__CONV_BUFFER);
    __CONV_ARRAY  = new Uint8ClampedArray(__CONV_BUFFER);
  };
var CNT_BitBuffer_ByteTable = [0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,1,2,2,3,2,3,3,4,2,3,3,4,3,4,4,5,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,2,3,3,4,3,4,4,5,3,4,4,5,4,5,5,6,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,3,4,4,5,4,5,5,6,4,5,5,6,5,6,6,7,4,5,5,6,5,6,6,7,5,6,6,7,6,7,7,8];
/// TW3RGBA = record
///  [line: 175, column: 3, file: System.Colors]
function Copy$TW3RGBA(s,d) {
   d.A$67=s.A$67;
   d.B$1=s.B$1;
   d.G$1=s.G$1;
   d.R$1=s.R$1;
   return d;
}
function Clone$TW3RGBA($) {
   return {
      A$67:$.A$67,
      B$1:$.B$1,
      G$1:$.G$1,
      R$1:$.R$1
   }
}
function StrToColor(aColorStr) {
   aColorStr={v:aColorStr};
   var Result = {v:0};
   try {
      var mTemp = "";
      var xpos = 0;
      var r = 0;
      var g = 0;
      var b = 0;
      aColorStr.v = Trim$_String_(aColorStr.v);
      if (!aColorStr.v.length) {
         return Result.v;
      }
      if ((aColorStr.v.charAt(0)=="#")||(aColorStr.v.charAt(0)=="$")) {
         Result.v = parseInt("0x"+Trim$_String_Integer_Integer_(aColorStr.v,1,0),16);
      } else {
         if ((aColorStr.v).substr(0,2)=="0x") {
            Result.v = parseInt(aColorStr.v,16);
         } else if (((aColorStr.v).substr(0,4)).toLowerCase()=="rgb(") {
            aColorStr.v = Trim$_String_Integer_Integer_(aColorStr.v,4,0);
            try {
               xpos = (aColorStr.v.indexOf(",")+1);
               if (xpos>1) {
                  mTemp = aColorStr.v.substr(0,(xpos-1));
                  Delete(aColorStr,1,xpos);
                  if (mTemp.charAt(0)=="$") {
                     mTemp = "0x"+Trim$_String_Integer_Integer_(mTemp,1,0);
                  }
                  r = parseInt(mTemp,10);
               }
               xpos = (aColorStr.v.indexOf(",")+1);
               if (xpos>1) {
                  mTemp = aColorStr.v.substr(0,(xpos-1));
                  Delete(aColorStr,1,xpos);
                  if (mTemp.charAt(0)=="$") {
                     mTemp = "0x"+Trim$_String_Integer_Integer_(mTemp,1,0);
                  }
                  g = parseInt(mTemp,10);
               }
               xpos = (aColorStr.v.indexOf(")")+1);
               if (xpos>1) {
                  mTemp = aColorStr.v.substr(0,(xpos-1));
                  if (mTemp.charAt(0)=="$") {
                     mTemp = "0x"+Trim$_String_Integer_Integer_(mTemp,1,0);
                  }
                  b = parseInt(mTemp,10);
               }
               Result.v = RGBToColor(r,g,b);
            } catch ($e) {
               var e$8 = $W($e);
               return Result.v;
            }
         }
      }
   } finally {return Result.v}
};
function RGBToColor(aRed, aGreen, aBlue) {
   return (aBlue|(aGreen<<8))|(aRed<<16);
};
function ColorToWebStr(aColor, alpha) {
   return ColorToWebStr$1((aColor>>>16)&255,(aColor>>>8)&255,aColor&255,alpha);
};
function ColorToWebStr$1(r$1, g$1, b$17, a$92) {
   return (a$92==255)?"#"+IntToHex2(r$1)+IntToHex2(g$1)+IntToHex2(b$17):"rgba("+r$1.toString()+","+g$1.toString()+","+b$17.toString()+","+FloatToStr$_Float_(a$92/255)+")";
};
function W3FontDetector() {
   var Result = null;
   if (_FontDetect===null) {
      _FontDetect = TW3FontDetector.Create$55($New(TW3FontDetector));
   }
   Result = _FontDetect;
   return Result
};
/// TW3TextMetric = record
///  [line: 54, column: 3, file: SmartCL.Fonts]
function Copy$TW3TextMetric(s,d) {
   d.tmWidth=s.tmWidth;
   d.tmHeight=s.tmHeight;
   return d;
}
function Clone$TW3TextMetric($) {
   return {
      tmWidth:$.tmWidth,
      tmHeight:$.tmHeight
   }
}
/// TW3FontInfo = record
///  [line: 64, column: 3, file: SmartCL.Fonts]
function Copy$TW3FontInfo(s,d) {
   d.fiName=s.fiName;
   d.fiSize=s.fiSize;
   return d;
}
function Clone$TW3FontInfo($) {
   return {
      fiName:$.fiName,
      fiSize:$.fiSize
   }
}
/// TW3FontDetector = class (TObject)
///  [line: 77, column: 3, file: SmartCL.Fonts]
var TW3FontDetector = {
   $ClassName:"TW3FontDetector",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FBaseFonts = [];
      $.FdefaultHeight = $.FdefaultWidth = undefined;
      $.Fh = undefined;
      $.Fs = undefined;
      $.FtestSize = "72px";
      $.FtestString = "mmmmmmmmmmlli";
   }
   /// constructor TW3FontDetector.Create()
   ///  [line: 150, column: 29, file: SmartCL.Fonts]
   ,Create$55:function(Self) {
      var x$18 = 0;
      TObject.Create(Self);
      Self.FBaseFonts.push("monospace");
      Self.FBaseFonts.push("sans-serif");
      Self.FBaseFonts.push("serif");
      Self.Fh = document.body;
      Self.Fs = document.createElement("span");
      Self.Fs.style.fontSize = Self.FtestSize;
      Self.Fs.innerHTML = Self.FtestString;
      Self.FdefaultWidth = TVariant.CreateObject();
      Self.FdefaultHeight = TVariant.CreateObject();
      if (Self.FBaseFonts.length>0) {
         var $temp26;
         for(x$18 = 0,$temp26 = Self.FBaseFonts.length;x$18<$temp26;x$18++) {
            Self.Fs.style.fontFamily = Self.FBaseFonts[x$18];
            Self.Fh.appendChild(Self.Fs);
            Self.FdefaultWidth[Self.FBaseFonts[x$18]] = Self.Fs.offsetWidth;
            Self.FdefaultHeight[Self.FBaseFonts[x$18]] = Self.Fs.offsetHeight;
            Self.Fh.removeChild(Self.Fs);
         }
      }
      return Self
   }
   /// function TW3FontDetector.Detect(aFont: String) : Boolean
   ///  [line: 212, column: 26, file: SmartCL.Fonts]
   ,Detect:function(Self, aFont) {
      var Result = false;
      var x$19 = 0;
      aFont = Trim$_String_(aFont);
      if (aFont.length>0) {
         if (Self.FBaseFonts.length>0) {
            var $temp27;
            for(x$19 = 0,$temp27 = Self.FBaseFonts.length;x$19<$temp27;x$19++) {
               Self.Fs.style.fontFamily = (aFont+","+Self.FBaseFonts[x$19]);
               Self.Fh.appendChild(Self.Fs);
               Result = (Self.Fs.offsetWidth!=Self.FdefaultWidth[Self.FBaseFonts[x$19]])&&(Self.Fs.offsetHeight!=Self.FdefaultHeight[Self.FBaseFonts[x$19]]);
               Self.Fh.removeChild(Self.Fs);
               if (Result) {
                  break;
               }
            }
         }
      }
      return Result
   }
   /// function TW3FontDetector.getFontInfo(const aHandle: THandle) : TW3FontInfo
   ///  [line: 178, column: 26, file: SmartCL.Fonts]
   ,getFontInfo$2:function(Self, aHandle$3) {
      var Result = {fiName:"",fiSize:0};
      var mName = "";
      var mSize$3 = 0;
      var mData$4 = [];
      var x$20 = 0;
      Result.fiSize = -1;
      if (aHandle$3.valid) {
         mName = w3_getStyleAsStr(aHandle$3,"font-family");
         mSize$3 = w3_getStyleAsInt(aHandle$3,"font-size");
         if (mName.length>0) {
            
        mData$4 = (mName).split(",");
      if (mData$4.length>0) {
               var $temp28;
               for(x$20 = 0,$temp28 = mData$4.length;x$20<$temp28;x$20++) {
                  if (TW3FontDetector.Detect(Self,mData$4[x$20])) {
                     Result.fiName = mData$4[x$20];
                     Result.fiSize = mSize$3;
                     break;
                  }
               }
            }
         }
      }
      return Result
   }
   /// function TW3FontDetector.MeasureText(aFontName: String; aFontSize: Integer; aFixedWidth: Integer; aContent: String) : TW3TextMetric
   ///  [line: 278, column: 26, file: SmartCL.Fonts]
   ,MeasureText$5:function(Self, aFontName, aFontSize, aFixedWidth, aContent) {
      var Result = {tmWidth:0,tmHeight:0};
      var mElement = undefined;
      if (TW3FontDetector.Detect(Self,aFontName)) {
         aContent = Trim$_String_(aContent);
         if (aContent.length>0) {
            mElement = document.createElement("p");
            if (mElement) {
               mElement.style["font-family"] = aFontName;
               mElement.style["font-size"] = TInteger.ToPxStr(aFontSize);
               mElement.style["overflow"] = "scroll";
               mElement.style.maxWidth = TInteger.ToPxStr(aFixedWidth);
               mElement.style.width = TInteger.ToPxStr(aFixedWidth);
               mElement.innerHTML = aContent;
               Self.Fh.appendChild(mElement);
               Result.tmWidth = parseInt(mElement.scrollWidth,10);
               Result.tmHeight = parseInt(mElement.scrollHeight,10);
               Self.Fh.removeChild(mElement);
            }
         }
      }
      return Result
   }
   /// function TW3FontDetector.MeasureText(aFontName: String; aFontSize: Integer; aContent: String) : TW3TextMetric
   ///  [line: 246, column: 26, file: SmartCL.Fonts]
   ,MeasureText$4:function(Self, aFontName$1, aFontSize$1, aContent$1) {
      var Result = {tmWidth:0,tmHeight:0};
      var mElement$1 = undefined;
      if (TW3FontDetector.Detect(Self,aFontName$1)) {
         aContent$1 = Trim$_String_(aContent$1);
         if (aContent$1.length>0) {
            mElement$1 = document.createElement("p");
            if (mElement$1) {
               mElement$1.style["font-family"] = aFontName$1;
               mElement$1.style["font-size"] = TInteger.ToPxStr(aFontSize$1);
               mElement$1.style["overflow"] = "scroll";
               mElement$1.style["display"] = "inline-block";
               mElement$1.style["white-space"] = "nowrap";
               mElement$1.innerHTML = aContent$1;
               Self.Fh.appendChild(mElement$1);
               Result.tmWidth = parseInt(mElement$1.scrollWidth,10);
               Result.tmHeight = parseInt(mElement$1.scrollHeight,10);
               Self.Fh.removeChild(mElement$1);
            }
         }
      }
      return Result
   }
   /// function TW3FontDetector.MeasureText(aFontInfo: TW3FontInfo; aFixedWidth: Integer; aContent: String) : TW3TextMetric
   ///  [line: 233, column: 26, file: SmartCL.Fonts]
   ,MeasureText$3:function(Self, aFontInfo, aFixedWidth$1, aContent$2) {
      return TW3FontDetector.MeasureText$5(Self,aFontInfo.fiName,aFontInfo.fiSize,aFixedWidth$1,aContent$2);
   }
   /// function TW3FontDetector.MeasureText(aFontInfo: TW3FontInfo; aContent: String) : TW3TextMetric
   ///  [line: 240, column: 26, file: SmartCL.Fonts]
   ,MeasureText$2:function(Self, aFontInfo$1, aContent$3) {
      return TW3FontDetector.MeasureText$4(Self,aFontInfo$1.fiName,aFontInfo$1.fiSize,aContent$3);
   }
   ,Destroy:TObject.Destroy
};
/// EW3FontError = class (EW3Exception)
///  [line: 22, column: 3, file: SmartCL.Fonts]
var EW3FontError = {
   $ClassName:"EW3FontError",
   $Parent:EW3Exception
   ,$Init:function ($) {
      EW3Exception.$Init($);
   }
   ,Destroy:Exception.Destroy
};
/// TW3TextMetrics = record
///  [line: 115, column: 3, file: SmartCL.Graphics]
function Copy$TW3TextMetrics(s,d) {
   return d;
}
function Clone$TW3TextMetrics($) {
   return {

   }
}
/// TW3ImageData = class (TObject)
///  [line: 140, column: 3, file: SmartCL.Graphics]
var TW3ImageData = {
   $ClassName:"TW3ImageData",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FHandle$1 = null;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 169, column: 35, file: SmartCL.Graphics]
   ,a$9:function(Self) {
      return Self.FHandle$1.height;
   }
   /// anonymous TSourceMethodSymbol
   ///  [line: 168, column: 34, file: SmartCL.Graphics]
   ,a$8:function(Self) {
      return Self.FHandle$1.width;
   }
   /// procedure TW3ImageData.FromContextNew(const aContextRef: THandle; const aWidth: Integer; const aHeight: Integer)
   ///  [line: 413, column: 24, file: SmartCL.Graphics]
   ,FromContextNew:function(Self, aContextRef, aWidth$2, aHeight$2) {
      var mRef$22 = null;
      if (aContextRef) {
         if ((aWidth$2>0)&&(aHeight$2>0)) {
            try {
               mRef$22 = aContextRef.createImageData(aWidth$2,aHeight$2);
            } catch ($e) {
               var e$9 = $W($e);
               throw Exception.Create($New(Exception),$R[16]+"createImageData() failed with \""+e$9.FMessage+"\"");
            }
            Self.FHandle$1 = mRef$22;
         } else {
            throw Exception.Create($New(Exception),$R[16]+"invalid width or height error");
         }
      } else {
         throw Exception.Create($New(Exception),$R[16]+"reference was nil error");
      }
   }
   /// procedure TW3ImageData.FromImageData(aImageDataRef: JImageData)
   ///  [line: 437, column: 24, file: SmartCL.Graphics]
   ,FromImageData:function(Self, aImageDataRef) {
      $Assert(aImageDataRef!==null,$R[16]+"reference was nil error","");
      Self.FHandle$1 = aImageDataRef;
   }
   /// function TW3ImageData.GetA(x: Integer; y: Integer) : Integer
   ///  [line: 551, column: 23, file: SmartCL.Graphics]
   ,GetA:function(Self, x$21, y$6) {
      var Result = 0;
      var mIndex$4 = 0;
      mIndex$4 = ((Self.FHandle$1.width*y$6)+x$21)*4;
      Result = Self.FHandle$1.data[(mIndex$4+3)];
      return Result
   }
   /// function TW3ImageData.GetB(x: Integer; y: Integer) : Integer
   ///  [line: 535, column: 23, file: SmartCL.Graphics]
   ,GetB:function(Self, x$22, y$7) {
      var Result = 0;
      var mIndex$5 = 0;
      mIndex$5 = ((Self.FHandle$1.width*y$7)+x$22)*4;
      Result = Self.FHandle$1.data[(mIndex$5+2)];
      return Result
   }
   /// function TW3ImageData.GetG(x: Integer; y: Integer) : Integer
   ///  [line: 519, column: 23, file: SmartCL.Graphics]
   ,GetG:function(Self, x$23, y$8) {
      var Result = 0;
      var mIndex$6 = 0;
      mIndex$6 = ((Self.FHandle$1.width*y$8)+x$23)*4;
      Result = Self.FHandle$1.data[(mIndex$6+1)];
      return Result
   }
   /// function TW3ImageData.GetR(x: Integer; y: Integer) : Integer
   ///  [line: 503, column: 23, file: SmartCL.Graphics]
   ,GetR:function(Self, x$24, y$9) {
      var Result = 0;
      var mIndex$7 = 0;
      mIndex$7 = ((Self.FHandle$1.width*y$9)+x$24)*4;
      Result = Self.FHandle$1.data[mIndex$7];
      return Result
   }
   /// procedure TW3ImageData.SetA(x: Integer; y: Integer; aValue: Integer)
   ///  [line: 589, column: 24, file: SmartCL.Graphics]
   ,SetA:function(Self, x$25, y$10, aValue$57) {
      var mIndex$8 = 0;
      mIndex$8 = ((Self.FHandle$1.width*y$10)+x$25)*4;
      Self.FHandle$1.data[(mIndex$8+3)]=aValue$57;
   }
   /// procedure TW3ImageData.SetB(x: Integer; y: Integer; aValue: Integer)
   ///  [line: 543, column: 24, file: SmartCL.Graphics]
   ,SetB:function(Self, x$26, y$11, aValue$58) {
      var mIndex$9 = 0;
      mIndex$9 = ((Self.FHandle$1.width*y$11)+x$26)*4;
      Self.FHandle$1.data[(mIndex$9+2)]=aValue$58;
   }
   /// procedure TW3ImageData.SetG(x: Integer; y: Integer; aValue: Integer)
   ///  [line: 527, column: 24, file: SmartCL.Graphics]
   ,SetG:function(Self, x$27, y$12, aValue$59) {
      var mIndex$10 = 0;
      mIndex$10 = ((Self.FHandle$1.width*y$12)+x$27)*4;
      Self.FHandle$1.data[(mIndex$10+1)]=aValue$59;
   }
   /// procedure TW3ImageData.SetR(x: Integer; y: Integer; aValue: Integer)
   ///  [line: 511, column: 24, file: SmartCL.Graphics]
   ,SetR:function(Self, x$28, y$13, aValue$60) {
      var mIndex$11 = 0;
      mIndex$11 = ((Self.FHandle$1.width*y$13)+x$28)*4;
      Self.FHandle$1.data[mIndex$11]=aValue$60;
   }
   ,Destroy:TObject.Destroy
};
/// TW3CustomGraphicContext = class (TObject)
///  [line: 28, column: 3, file: SmartCL.Graphics]
var TW3CustomGraphicContext = {
   $ClassName:"TW3CustomGraphicContext",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// procedure TW3CustomGraphicContext.Allocate(const aWidth: Integer; const aHeight: Integer)
   ///  [line: 773, column: 35, file: SmartCL.Graphics]
   ,Allocate$1:function(Self, aWidth$3, aHeight$3) {
      if (TW3CustomGraphicContext.GetOwnsReference$(Self)) {
         if (VarIsValidRef(TW3CustomGraphicContext.GetDC$(Self))) {
            TW3CustomGraphicContext.Release$1(Self);
         }
         TW3CustomGraphicContext.SetSize$1$(Self,aWidth$3,aHeight$3);
      } else {
         throw Exception.Create($New(Exception),"Cannot modify current graphics context");
      }
   }
   /// procedure TW3CustomGraphicContext.Release()
   ///  [line: 784, column: 35, file: SmartCL.Graphics]
   ,Release$1:function(Self) {
      if (TW3CustomGraphicContext.GetOwnsReference$(Self)) {
         if (VarIsValidRef(TW3CustomGraphicContext.GetDC$(Self))) {
            TW3CustomGraphicContext.ReleaseDC$(Self);
         }
      } else {
         throw Exception.Create($New(Exception),"Cannot modify current graphics context");
      }
   }
   ,Destroy:TObject.Destroy
   ,GetDC$:function($){return $.ClassType.GetDC($)}
   ,GetHandle$:function($){return $.ClassType.GetHandle($)}
   ,GetHeight$1$:function($){return $.ClassType.GetHeight$1($)}
   ,GetOwnsReference$:function($){return $.ClassType.GetOwnsReference($)}
   ,GetWidth$1$:function($){return $.ClassType.GetWidth$1($)}
   ,ReleaseDC$:function($){return $.ClassType.ReleaseDC($)}
   ,SetSize$1$:function($){return $.ClassType.SetSize$1.apply($.ClassType, arguments)}
};
/// TW3GraphicContext = class (TW3CustomGraphicContext)
///  [line: 94, column: 3, file: SmartCL.Graphics]
var TW3GraphicContext = {
   $ClassName:"TW3GraphicContext",
   $Parent:TW3CustomGraphicContext
   ,$Init:function ($) {
      TW3CustomGraphicContext.$Init($);
      $.FObjId = "";
      $.FObjRef = undefined;
      $.FOwner$2 = undefined;
   }
   /// constructor TW3GraphicContext.Create(const AOwner: THandle)
   ///  [line: 811, column: 31, file: SmartCL.Graphics]
   ,Create$29:function(Self, AOwner$5) {
      TObject.Create(Self);
      Self.FObjRef = w3_createHtmlElement("canvas");
      Self.FObjId = w3_GetUniqueObjId();
      Self.FObjRef.id = Self.FObjId;
      Self.FOwner$2 = AOwner$5;
      if (Self.FOwner$2) {
         w3_setElementParentByRef(Self.FObjRef,Self.FOwner$2);
      }
      return Self
   }
   /// destructor TW3GraphicContext.Destroy()
   ///  [line: 830, column: 30, file: SmartCL.Graphics]
   ,Destroy:function(Self) {
      if (Self.FOwner$2) {
         w3_RemoveElementByRef(Self.FObjRef,Self.FOwner$2);
      }
      Self.FOwner$2 = null;
      Self.FObjRef = null;
      TObject.Destroy(Self);
   }
   /// function TW3GraphicContext.GetDC() : THandle
   ///  [line: 852, column: 28, file: SmartCL.Graphics]
   ,GetDC:function(Self) {
      var Result = undefined;
      if (Self.FObjRef) {
         Result = Self.FObjRef.getContext("2d");
      } else {
         Result = null;
      }
      return Result
   }
   /// function TW3GraphicContext.GetHandle() : THandle
   ///  [line: 842, column: 28, file: SmartCL.Graphics]
   ,GetHandle:function(Self) {
      return Self.FObjRef;
   }
   /// function TW3GraphicContext.GetHeight() : Integer
   ///  [line: 874, column: 28, file: SmartCL.Graphics]
   ,GetHeight$1:function(Self) {
      var Result = 0;
      if (Self.FObjRef) {
         Result = parseInt(Self.FObjRef.height,10);
      }
      return Result
   }
   /// function TW3GraphicContext.GetOwnsReference() : Boolean
   ///  [line: 847, column: 28, file: SmartCL.Graphics]
   ,GetOwnsReference:function(Self) {
      return true;
   }
   /// function TW3GraphicContext.GetWidth() : Integer
   ///  [line: 868, column: 28, file: SmartCL.Graphics]
   ,GetWidth$1:function(Self) {
      var Result = 0;
      if (Self.FObjRef) {
         Result = parseInt(Self.FObjRef.width,10);
      }
      return Result
   }
   /// procedure TW3GraphicContext.ReleaseDC()
   ///  [line: 880, column: 29, file: SmartCL.Graphics]
   ,ReleaseDC:function(Self) {
      if (Self.FObjRef) {
         Self.FObjRef.width = 0;
         Self.FObjRef.height = 0;
      }
   }
   /// procedure TW3GraphicContext.SetSize(aNewWidth: Integer; aNewHeight: Integer)
   ///  [line: 859, column: 29, file: SmartCL.Graphics]
   ,SetSize$1:function(Self, aNewWidth, aNewHeight) {
      if (Self.FObjRef) {
         Self.FObjRef.width = aNewWidth;
         Self.FObjRef.height = aNewHeight;
      }
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,GetDC$:function($){return $.ClassType.GetDC($)}
   ,GetHandle$:function($){return $.ClassType.GetHandle($)}
   ,GetHeight$1$:function($){return $.ClassType.GetHeight$1($)}
   ,GetOwnsReference$:function($){return $.ClassType.GetOwnsReference($)}
   ,GetWidth$1$:function($){return $.ClassType.GetWidth$1($)}
   ,ReleaseDC$:function($){return $.ClassType.ReleaseDC($)}
   ,SetSize$1$:function($){return $.ClassType.SetSize$1.apply($.ClassType, arguments)}
};
/// TW3ControlGraphicContext = class (TW3CustomGraphicContext)
///  [line: 54, column: 3, file: SmartCL.Graphics]
var TW3ControlGraphicContext = {
   $ClassName:"TW3ControlGraphicContext",
   $Parent:TW3CustomGraphicContext
   ,$Init:function ($) {
      TW3CustomGraphicContext.$Init($);
      $.FCtrlTag = undefined;
   }
   /// constructor TW3ControlGraphicContext.Create(const aControlHandle: THandle)
   ///  [line: 725, column: 38, file: SmartCL.Graphics]
   ,Create$30:function(Self, aControlHandle) {
      TObject.Create(Self);
      if (aControlHandle) {
         Self.FCtrlTag = aControlHandle;
      } else {
         throw Exception.Create($New(Exception),"Control handle is invalid error");
      }
      return Self
   }
   /// function TW3ControlGraphicContext.GetDC() : THandle
   ///  [line: 734, column: 35, file: SmartCL.Graphics]
   ,GetDC:function(Self) {
      return Self.FCtrlTag.getContext("2d");
   }
   /// function TW3ControlGraphicContext.GetHandle() : THandle
   ///  [line: 739, column: 35, file: SmartCL.Graphics]
   ,GetHandle:function(Self) {
      return Self.FCtrlTag;
   }
   /// function TW3ControlGraphicContext.GetHeight() : Integer
   ///  [line: 749, column: 35, file: SmartCL.Graphics]
   ,GetHeight$1:function(Self) {
      return w3_getPropertyAsInt(Self.FCtrlTag,"height");
   }
   /// function TW3ControlGraphicContext.GetOwnsReference() : Boolean
   ///  [line: 754, column: 35, file: SmartCL.Graphics]
   ,GetOwnsReference:function(Self) {
      return false;
   }
   /// function TW3ControlGraphicContext.GetWidth() : Integer
   ///  [line: 744, column: 35, file: SmartCL.Graphics]
   ,GetWidth$1:function(Self) {
      return w3_getPropertyAsInt(Self.FCtrlTag,"width");
   }
   /// procedure TW3ControlGraphicContext.ReleaseDC()
   ///  [line: 764, column: 36, file: SmartCL.Graphics]
   ,ReleaseDC:function(Self) {
      /* null */
   }
   /// procedure TW3ControlGraphicContext.SetSize(aNewWidth: Integer; aNewHeight: Integer)
   ///  [line: 759, column: 36, file: SmartCL.Graphics]
   ,SetSize$1:function(Self, aNewWidth$1, aNewHeight$1) {
      /* null */
   }
   ,Destroy:TObject.Destroy
   ,GetDC$:function($){return $.ClassType.GetDC($)}
   ,GetHandle$:function($){return $.ClassType.GetHandle($)}
   ,GetHeight$1$:function($){return $.ClassType.GetHeight$1($)}
   ,GetOwnsReference$:function($){return $.ClassType.GetOwnsReference($)}
   ,GetWidth$1$:function($){return $.ClassType.GetWidth$1($)}
   ,ReleaseDC$:function($){return $.ClassType.ReleaseDC($)}
   ,SetSize$1$:function($){return $.ClassType.SetSize$1.apply($.ClassType, arguments)}
};
/// TW3CanvasPattern = class (TObject)
///  [line: 133, column: 3, file: SmartCL.Graphics]
var TW3CanvasPattern = {
   $ClassName:"TW3CanvasPattern",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   ,Destroy:TObject.Destroy
};
/// TW3CanvasGradient = class (TObject)
///  [line: 119, column: 3, file: SmartCL.Graphics]
var TW3CanvasGradient = {
   $ClassName:"TW3CanvasGradient",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FHandle$3 = undefined;
   }
   /// constructor TW3CanvasGradient.Create(const aHandle: THandle)
   ///  [line: 602, column: 31, file: SmartCL.Graphics]
   ,Create$31:function(Self, aHandle$4) {
      TObject.Create(Self);
      Self.FHandle$3 = aHandle$4;
      return Self
   }
   ,Destroy:TObject.Destroy
};
/// TW3Canvas = class (TObject)
///  [line: 180, column: 3, file: SmartCL.Graphics]
var TW3Canvas = {
   $ClassName:"TW3Canvas",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FContext = $.FDC = null;
   }
   /// constructor TW3Canvas.Create(Context: TW3CustomGraphicContext)
   ///  [line: 893, column: 23, file: SmartCL.Graphics]
   ,Create$32:function(Self, Context$3) {
      TObject.Create(Self);
      Self.FContext = Context$3;
      if (Self.FContext) {
         Self.FDC = TW3CustomGraphicContext.GetDC$(Self.FContext);
      } else {
         throw Exception.Create($New(Exception),"Invalid canvas context error");
      }
      return Self
   }
   /// procedure TW3Canvas.DrawImageF(imageHandle: THandle; x: Float; y: Float)
   ///  [line: 1190, column: 21, file: SmartCL.Graphics]
   ,DrawImageF:function(Self, imageHandle, x$29, y$14) {
      Self.FDC.drawImage(imageHandle,x$29,y$14);
   }
   /// procedure TW3Canvas.PutImageData(imageData: TW3ImageData; x: Float; y: Float)
   ///  [line: 1356, column: 21, file: SmartCL.Graphics]
   ,PutImageData:function(Self, imageData, x$30, y$15) {
      if (imageData) {
         Self.FDC.putImageData(imageData.FHandle$1,x$30,y$15);
      } else {
         throw Exception.Create($New(Exception),"ImageData was nil error");
      }
   }
   /// function TW3Canvas.ToDataURL(aMimeType: String) : String
   ///  [line: 1319, column: 20, file: SmartCL.Graphics]
   ,ToDataURL:function(Self, aMimeType) {
      return Self.FDC.canvas.toDataURL(aMimeType);
   }
   /// function TW3Canvas.ToImageData() : TW3ImageData
   ///  [line: 1324, column: 20, file: SmartCL.Graphics]
   ,ToImageData:function(Self) {
      var Result = null;
      var mTemp$2 = null;
      var wd$1 = 0;
      var hd$1 = 0;
      wd$1 = Self.FDC.canvas.width;
      hd$1 = Self.FDC.canvas.height;
      try {
         mTemp$2 = Self.FDC.getImageData(0,0,wd$1,hd$1);
      } catch ($e) {
         var e$10 = $W($e);
         throw Exception.Create($New(Exception),"Failed to extract data, browser threw exception: "+e$10.FMessage);
      }
      if (mTemp$2) {
         Result = TObject.Create($New(TW3ImageData));
         TW3ImageData.FromImageData(Result,mTemp$2);
      }
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// JMouseButton enumeration
///  [line: 146, column: 3, file: W3C.DOM]
var JMouseButton = [ "Left", "Middle", "Right" ];
/// TW3CSSClassStyleNames = class (TW3OwnedObject)
///  [line: 24, column: 3, file: SmartCL.CssNames]
var TW3CSSClassStyleNames = {
   $ClassName:"TW3CSSClassStyleNames",
   $Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FCache = [];
      $.FToken = "";
   }
   /// function TW3CSSClassStyleNames.AcceptParent(aObject: TObject) : Boolean
   ///  [line: 73, column: 32, file: SmartCL.CssNames]
   ,AcceptParent:function(Self, aObject$4) {
      return (aObject$4!==null)&&$Is(aObject$4,TW3CustomControl);
   }
   /// constructor TW3CSSClassStyleNames.Create(AOwner: TObject)
   ///  [line: 60, column: 35, file: SmartCL.CssNames]
   ,Create$4:function(Self, AOwner$6) {
      TW3OwnedObject.Create$4(Self,AOwner$6);
      Self.FToken = "class";
      Self.FCache = [];
      return Self
   }
   /// destructor TW3CSSClassStyleNames.Destroy()
   ///  [line: 67, column: 34, file: SmartCL.CssNames]
   ,Destroy:function(Self) {
      Self.FCache.length=0;
      TObject.Destroy(Self);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AcceptParent$:function($){return $.ClassType.AcceptParent.apply($.ClassType, arguments)}
   ,Create$4$:function($){return $.ClassType.Create$4.apply($.ClassType, arguments)}
};
/// TW3TouchList = class (TObject)
///  [line: 58, column: 3, file: SmartCL.Touch]
var TW3TouchList = {
   $ClassName:"TW3TouchList",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FObjects = [];
   }
   /// procedure TW3TouchList.Clear()
   ///  [line: 131, column: 24, file: SmartCL.Touch]
   ,Clear$3:function(Self) {
      Self.FObjects.length=0;
   }
   /// procedure TW3TouchList.Update(refObj: JTouchList)
   ///  [line: 141, column: 24, file: SmartCL.Touch]
   ,Update:function(Self, refObj) {
      var mCount$2 = 0;
      var x$31 = 0;
      var mObj$9 = null;
      mCount$2 = refObj.length;
      if (mCount$2==Self.FObjects.length) {
         var $temp29;
         for(x$31 = 0,$temp29 = mCount$2;x$31<$temp29;x$31++) {
            TW3Touch.Consume$1(Self.FObjects[x$31],refObj[x$31]);
         }
      } else {
         TW3TouchList.Clear$3(Self);
         var $temp30;
         for(x$31 = 0,$temp30 = mCount$2;x$31<$temp30;x$31++) {
            mObj$9 = TObject.Create($New(TW3Touch));
            TW3Touch.Consume$1(mObj$9,refObj[x$31]);
            Self.FObjects.push(mObj$9);
         }
      }
   }
   ,Destroy:TObject.Destroy
};
/// TW3TouchData = class (TObject)
///  [line: 70, column: 3, file: SmartCL.Touch]
var TW3TouchData = {
   $ClassName:"TW3TouchData",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FChanged = $.FTouches = null;
   }
   /// procedure TW3TouchData.Update(eventObj: JTouchEvent)
   ///  [line: 172, column: 24, file: SmartCL.Touch]
   ,Update$1:function(Self, eventObj$17) {
      if (Self.FTouches) {
         TW3TouchList.Update(Self.FTouches,eventObj$17.touches);
      }
      if (Self.FChanged) {
         TW3TouchList.Update(Self.FChanged,eventObj$17.changedTouches);
      }
   }
   ,Destroy:TObject.Destroy
};
/// TW3Touch = class (TObject)
///  [line: 34, column: 3, file: SmartCL.Touch]
var TW3Touch = {
   $ClassName:"TW3Touch",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FClientX = $.FClientY = $.FPageX = $.FPageY = $.FScreenX = $.FScreenY = 0;
      $.FIdent = undefined;
      $.FTarget = null;
   }
   /// procedure TW3Touch.Consume(touch: JTouch)
   ///  [line: 104, column: 20, file: SmartCL.Touch]
   ,Consume$1:function(Self, touch) {
      Self.FScreenX = touch.screenX;
      Self.FScreenY = touch.screenY;
      Self.FClientX = touch.clientX;
      Self.FClientY = touch.clientY;
      Self.FPageX = touch.pageX;
      Self.FPageY = touch.pageY;
      Self.FIdent = touch.identifier;
      Self.FTarget = TVariant.AsObject(touch.target);
   }
   ,Destroy:TObject.Destroy
};
/// TW3GestureData = class (TObject)
///  [line: 83, column: 3, file: SmartCL.Touch]
var TW3GestureData = {
   $ClassName:"TW3GestureData",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FRotation = $.FScale = 0;
   }
   /// procedure TW3GestureData.Consume(refObj: THandle)
   ///  [line: 206, column: 26, file: SmartCL.Touch]
   ,Consume$2:function(Self, refObj$1) {
      Self.FRotation = Number(refObj$1.rotation);
      Self.FScale = Number(refObj$1.scale);
   }
   /// procedure TW3GestureData.Update()
   ///  [line: 213, column: 26, file: SmartCL.Touch]
   ,Update$2:function(Self) {
      TW3GestureData.Consume$2(Self,event);
   }
   ,Destroy:TObject.Destroy
};
/// TW3Borders = class (TW3OwnedObject)
///  [line: 56, column: 3, file: SmartCL.Borders]
var TW3Borders = {
   $ClassName:"TW3Borders",
   $Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.FBottom = $.FLeft = $.FRight = $.FTop = null;
   }
   /// function TW3Borders.AcceptParent(AObject: TObject) : Boolean
   ///  [line: 338, column: 21, file: SmartCL.Borders]
   ,AcceptParent:function(Self, AObject) {
      return $Is(AObject,TW3TagObj);
   }
   /// constructor TW3Borders.Create(AOwner: TObject)
   ///  [line: 291, column: 24, file: SmartCL.Borders]
   ,Create$4:function(Self, AOwner$7) {
      TW3OwnedObject.Create$4(Self,AOwner$7);
      Self.FLeft = TW3Border.Create$58($New(TW3Border),Self,0);
      Self.FTop = TW3Border.Create$58($New(TW3Border),Self,1);
      Self.FRight = TW3Border.Create$58($New(TW3Border),Self,2);
      Self.FBottom = TW3Border.Create$58($New(TW3Border),Self,3);
      return Self
   }
   /// destructor TW3Borders.Destroy()
   ///  [line: 300, column: 23, file: SmartCL.Borders]
   ,Destroy:function(Self) {
      TObject.Free(Self.FLeft);
      TObject.Free(Self.FTop);
      TObject.Free(Self.FRight);
      TObject.Free(Self.FBottom);
      TObject.Destroy(Self);
   }
   /// function TW3Borders.GetHSpace() : Integer
   ///  [line: 333, column: 21, file: SmartCL.Borders]
   ,GetHSpace:function(Self) {
      return TW3Border.GetWidth$6(Self.FLeft)+TW3Border.GetPadding(Self.FLeft)+TW3Border.GetWidth$6(Self.FRight)+TW3Border.GetPadding(Self.FRight);
   }
   /// function TW3Borders.GetVSpace() : Integer
   ///  [line: 328, column: 21, file: SmartCL.Borders]
   ,GetVSpace:function(Self) {
      return TW3Border.GetWidth$6(Self.FTop)+TW3Border.GetPadding(Self.FTop)+TW3Border.GetWidth$6(Self.FBottom)+TW3Border.GetPadding(Self.FBottom);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AcceptParent$:function($){return $.ClassType.AcceptParent.apply($.ClassType, arguments)}
   ,Create$4$:function($){return $.ClassType.Create$4.apply($.ClassType, arguments)}
};
/// TW3BorderEdgeStyle enumeration
///  [line: 23, column: 3, file: SmartCL.Borders]
var TW3BorderEdgeStyle = [ "besNone", "besSolid", "besDotted", "besDouble", "besGroove", "besInset", "besOutset" ];
/// TW3BorderEdge enumeration
///  [line: 22, column: 3, file: SmartCL.Borders]
var TW3BorderEdge = [ "beLeft", "beTop", "beRight", "beBottom" ];
/// TW3Border = class (TObject)
///  [line: 28, column: 3, file: SmartCL.Borders]
var TW3Border = {
   $ClassName:"TW3Border",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FEdge = 0;
      $.FEdgeName = "";
      $.FOwner$4 = null;
   }
   /// constructor TW3Border.Create(AOwner: TW3Borders; AEdge: TW3BorderEdge)
   ///  [line: 94, column: 23, file: SmartCL.Borders]
   ,Create$58:function(Self, AOwner$8, AEdge) {
      TObject.Create(Self);
      Self.FOwner$4 = AOwner$8;
      Self.FEdge = Self.FEdge;
      switch (AEdge) {
         case 0 :
            Self.FEdgeName = "left";
            break;
         case 1 :
            Self.FEdgeName = "top";
            break;
         case 2 :
            Self.FEdgeName = "right";
            break;
         case 3 :
            Self.FEdgeName = "bottom";
            break;
      }
      return Self
   }
   /// function TW3Border.GetPadding() : Integer
   ///  [line: 131, column: 20, file: SmartCL.Borders]
   ,GetPadding:function(Self) {
      var Result = 0;
      var mRef$23 = undefined;
      var mKey = "";
      Result = 0;
      mRef$23 = $As(Self.FOwner$4.FOwner,TW3TagObj).FHandle;
      if (mRef$23) {
         mKey = "padding-"+Self.FEdgeName;
         Result = w3_getCssStyleAsInteger(mRef$23,mKey);
      }
      return Result
   }
   /// function TW3Border.GetWidth() : Integer
   ///  [line: 189, column: 20, file: SmartCL.Borders]
   ,GetWidth$6:function(Self) {
      var Result = 0;
      var mRef$24 = undefined;
      var mKey$1 = "";
      Result = 0;
      mRef$24 = $As(Self.FOwner$4.FOwner,TW3TagObj).FHandle;
      if (mRef$24) {
         mKey$1 = "border-"+Self.FEdgeName+"-width";
         Result = w3_getCssStyleAsInteger(mRef$24,mKey$1);
      }
      return Result
   }
   /// procedure TW3Border.SetPadding(aValue: Integer)
   ///  [line: 145, column: 21, file: SmartCL.Borders]
   ,SetPadding:function(Self, aValue$61) {
      var mRef$25 = undefined;
      var mKey$2 = "";
      mRef$25 = $As(Self.FOwner$4.FOwner,TW3TagObj).FHandle;
      if (mRef$25) {
         mKey$2 = "padding-"+Self.FEdgeName;
         w3_setCssStyle(mRef$25,mKey$2,TInteger.ToPxStr(aValue$61));
      } else {
         throw EW3Exception.CreateFmt($New(EW3TagObj),$R[0],["TW3Border.SetPadding", TObject.ClassName(Self.ClassType), $R[15]]);
      }
   }
   /// procedure TW3Border.SetWidth(aValue: Integer)
   ///  [line: 203, column: 21, file: SmartCL.Borders]
   ,SetWidth$2:function(Self, aValue$62) {
      var mRef$26 = undefined;
      var mKey$3 = "";
      mRef$26 = $As(Self.FOwner$4.FOwner,TW3TagObj).FHandle;
      if (mRef$26) {
         mKey$3 = "border-"+Self.FEdgeName+"-width";
         w3_setCssStyle(mRef$26,mKey$3,TInteger.ToPxStr(aValue$62));
      } else {
         throw EW3Exception.CreateFmt($New(EW3TagObj),$R[0],["TW3Border.SetWidth", TObject.ClassName(Self.ClassType), $R[15]]);
      }
   }
   ,Destroy:TObject.Destroy
};
/// TW3CustomAnimation = class (TObject)
///  [line: 25, column: 3, file: SmartCL.Effects]
var TW3CustomAnimation = {
   $ClassName:"TW3CustomAnimation",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FBusy = false;
      $.FDuration = 0;
      $.FInEvnCB = null;
      $.FOnBegins = null;
      $.FOnEnds = null;
      $.FTarget$1 = null;
   }
   /// procedure TW3CustomAnimation.CBBegins()
   ///  [line: 457, column: 30, file: SmartCL.Effects]
   ,CBBegins:function(Self) {
      if (Self.FOnBegins) {
         Self.FOnBegins(Self);
      }
   }
   /// procedure TW3CustomAnimation.CBEnds()
   ///  [line: 463, column: 30, file: SmartCL.Effects]
   ,CBEnds:function(Self) {
      TW3CustomAnimation.FinalizeTransition$(Self);
      if (Self.FOnEnds) {
         Self.FOnEnds(Self);
      }
   }
   /// constructor TW3CustomAnimation.Create()
   ///  [line: 436, column: 32, file: SmartCL.Effects]
   ,Create$59:function(Self) {
      TObject.Create(Self);
      Self.FDuration = DefaultDuration;
      return Self
   }
   /// destructor TW3CustomAnimation.Destroy()
   ///  [line: 442, column: 31, file: SmartCL.Effects]
   ,Destroy:function(Self) {
      if (Self.FBusy&&(Self.FTarget$1!==null)) {
         try {
            TW3CustomAnimation.FinalizeTransition$(Self);
         } catch ($e) {
            var e$11 = $W($e);
            /* null */
         }
      }
      TObject.Destroy(Self);
   }
   /// procedure TW3CustomAnimation.ExecuteEx(TargetObj: TW3TagObj; BeginHandler: TFxAnimationBeginsEvent; EndHandler: TFxAnimationEndsEvent)
   ///  [line: 513, column: 30, file: SmartCL.Effects]
   ,ExecuteEx:function(Self, TargetObj, BeginHandler, EndHandler) {
      if (!TargetObj) {
         throw Exception.Create($New(Exception),"Target-object was NIL error");
      }
      if (Self.FBusy) {
         throw Exception.Create($New(Exception),"Transition is already in progress error");
      } else {
         Self.FTarget$1 = TargetObj;
         Self.FOnBegins = BeginHandler;
         Self.FOnEnds = EndHandler;
         TW3CustomAnimation.SetupTransition$(Self);
      }
   }
   /// procedure TW3CustomAnimation.FinalizeTransition()
   ///  [line: 492, column: 30, file: SmartCL.Effects]
   ,FinalizeTransition:function(Self) {
      w3_RemoveEvent(Self.FTarget$1.FHandle,"animationend",Self.FInEvnCB,true);
      w3_RemoveEvent(Self.FTarget$1.FHandle,"webkitAnimationEnd",Self.FInEvnCB,true);
      Self.FBusy = false;
   }
   /// procedure TW3CustomAnimation.SetDuration(Value: Float)
   ///  [line: 470, column: 30, file: SmartCL.Effects]
   ,SetDuration:function(Self, Value$9) {
      if (Self.FBusy) {
         throw Exception.Create($New(Exception),"Duration cannot be altered while the transition is active error");
      } else {
         Self.FDuration = Value$9;
      }
   }
   /// procedure TW3CustomAnimation.SetupTransition()
   ///  [line: 478, column: 30, file: SmartCL.Effects]
   ,SetupTransition:function(Self) {
      Self.FBusy = true;
      Self.FInEvnCB = $Event0(Self,TW3CustomAnimation.CBEnds);
      w3_AddEvent(Self.FTarget$1.FHandle,"animationend",Self.FInEvnCB,true);
      w3_AddEvent(Self.FTarget$1.FHandle,"webkitAnimationEnd",Self.FInEvnCB,true);
      TW3CustomAnimation.CBBegins(Self);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,Create$59$:function($){return $.ClassType.Create$59($)}
   ,FinalizeTransition$:function($){return $.ClassType.FinalizeTransition($)}
   ,SetupTransition$:function($){return $.ClassType.SetupTransition($)}
};
/// TW3NamedAnimation = class (TW3CustomAnimation)
///  [line: 60, column: 3, file: SmartCL.Effects]
var TW3NamedAnimation = {
   $ClassName:"TW3NamedAnimation",
   $Parent:TW3CustomAnimation
   ,$Init:function ($) {
      TW3CustomAnimation.$Init($);
      $.FName$2 = "";
   }
   /// procedure TW3NamedAnimation.SetupTransition()
   ///  [line: 367, column: 29, file: SmartCL.Effects]
   ,SetupTransition:function(Self) {
      var mCommand = "";
      TW3CustomAnimation.SetupTransition(Self);
      w3_setStyle(Self.FTarget$1.FHandle,w3_CSSPrefix("AnimationFillMode"),"both");
      mCommand = Self.FName$2+" "+FloatToStr$_Float_(Self.FDuration)+"s linear";
      w3_setStyle(Self.FTarget$1.FHandle,w3_CSSPrefix("Animation"),mCommand);
   }
   /// procedure TW3NamedAnimation.FinalizeTransition()
   ///  [line: 377, column: 29, file: SmartCL.Effects]
   ,FinalizeTransition:function(Self) {
      TW3CustomAnimation.FinalizeTransition(Self);
      if (Self.FTarget$1!==null) {
         Self.FTarget$1.FHandle.style[w3_CSSPrefix("Animation")] = "none";
         Self.FTarget$1.FHandle.style[w3_CSSPrefix("AnimationFillMode")] = "none";
      }
   }
   ,Destroy:TW3CustomAnimation.Destroy
   ,Create$59:TW3CustomAnimation.Create$59
   ,FinalizeTransition$:function($){return $.ClassType.FinalizeTransition($)}
   ,SetupTransition$:function($){return $.ClassType.SetupTransition($)}
};
/// TW3AnimationTiming enumeration
///  [line: 83, column: 3, file: SmartCL.Effects]
var TW3AnimationTiming = [ "atEase", "atLinear", "atEaseIn", "atEaseOut", "atEaseInOut" ];
var cW3AnimationTiming = ["ease","linear","ease-in","ease-out","ease-in-out"];
/// TW3AlertResult enumeration
///  [line: 27, column: 3, file: SmartCL.Dialogs]
var TW3AlertResult = [ "roYes", "roNo", "roOK", "roCancel" ];
/// TW3AlertOptions enumeration
///  [line: 26, column: 3, file: SmartCL.Dialogs]
var TW3AlertOptions = [ "aoYes", "aoNo", "aoYesNo", "aoOK", "aoCancel", "aoOKCancel" ];
/// TW3AlertDialog = class (TW3CustomControl)
///  [line: 38, column: 3, file: SmartCL.Dialogs]
var TW3AlertDialog = {
   $ClassName:"TW3AlertDialog",
   $Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FNo = $.FOnSelect = $.FText = $.FTitle = $.FYes = null;
      $.FOptions = 0;
      $.FReady = false;
   }
   /// procedure TW3AlertDialog.FinalizeObject()
   ///  [line: 87, column: 26, file: SmartCL.Dialogs]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FTitle);
      TObject.Free(Self.FText);
      TObject.Free(Self.FYes);
      TObject.Free(Self.FNo);
      TW3CustomControl.FinalizeObject(Self);
   }
   /// procedure TW3AlertDialog.HandleNoClick(Sender: TObject)
   ///  [line: 112, column: 26, file: SmartCL.Dialogs]
   ,HandleNoClick:function(Self, Sender$2) {
      if (Self.FOnSelect) {
         switch (Self.FOptions) {
            case 0 :
            case 2 :
            case 1 :
               Self.FOnSelect(Self,1);
               break;
            case 3 :
            case 4 :
            case 5 :
               Self.FOnSelect(Self,3);
               break;
         }
      }
   }
   /// procedure TW3AlertDialog.HandleYesClick(Sender: TObject)
   ///  [line: 101, column: 26, file: SmartCL.Dialogs]
   ,HandleYesClick:function(Self, Sender$3) {
      if (Self.FOnSelect) {
         switch (Self.FOptions) {
            case 0 :
            case 2 :
            case 1 :
               Self.FOnSelect(Self,0);
               break;
            case 3 :
            case 4 :
            case 5 :
               Self.FOnSelect(Self,2);
               break;
         }
      }
   }
   /// procedure TW3AlertDialog.InitializeObject()
   ///  [line: 68, column: 26, file: SmartCL.Dialogs]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FYes = TW3Component.Create$19$($New(TW3AlertButton),Self);
      TW3MovableControl.SetSize(Self.FYes,120,42);
      TW3Button.SetCaption(Self.FYes,"OK");
      TW3CustomControl._setMouseClick(Self.FYes,$Event1(Self,TW3AlertDialog.HandleYesClick));
      TW3MovableControl.SetVisible(Self.FYes,false);
      Self.FNo = TW3Component.Create$19$($New(TW3AlertButton),Self);
      TW3MovableControl.SetSize(Self.FNo,120,42);
      TW3Button.SetCaption(Self.FNo,"Cancel");
      TW3CustomControl._setMouseClick(Self.FNo,$Event1(Self,TW3AlertDialog.HandleNoClick));
      TW3MovableControl.SetVisible(Self.FNo,false);
      Self.FTitle = TW3Component.Create$19$($New(TW3Label),Self);
      Self.FText = TW3Component.Create$19$($New(TW3Label),Self);
   }
   /// procedure TW3AlertDialog.Resize()
   ///  [line: 194, column: 26, file: SmartCL.Dialogs]
   ,Resize:function(Self) {
      var hd$2 = 0;
      var wd$2 = 0;
      var dx$3 = 0;
      var dy$4 = 0;
      TW3MovableControl.Resize(Self);
      wd$2 = TW3ScrollInfo.GetScrollWidth(TW3CustomControl.GetScrollInfo(Self));
      hd$2 = TW3ScrollInfo.GetScrollHeight(TW3CustomControl.GetScrollInfo(Self));
      TW3MovableControl.SetBounds$2(Self.FTitle,8,8,wd$2-16,32);
      TW3MovableControl.SetBounds$2(Self.FText,8,TW3MovableControl.GetTop(Self.FTitle)+TW3MovableControl.GetHeight$(Self.FTitle)+2,wd$2-16,92);
      if (Self.FObjReady&&Self.FReady) {
         (wd$2-= 16);
         if ((1<<Self.FOptions&36)!=0) {
            (wd$2-= 8);
         }
         if ((1<<Self.FOptions&27)!=0) {
            if ((1<<Self.FOptions&9)!=0) {
               dy$4 = TW3MovableControl.GetHeight$(Self)-(TW3MovableControl.GetHeight$(Self.FYes)+20);
               TW3MovableControl.SetBounds$2(Self.FYes,10,dy$4,wd$2,TW3MovableControl.GetHeight$(Self.FYes));
            } else if ((1<<Self.FOptions&18)!=0) {
               dy$4 = TW3MovableControl.GetHeight$(Self)-(TW3MovableControl.GetHeight$(Self.FNo)+20);
               TW3MovableControl.SetBounds$2(Self.FNo,10,dy$4,wd$2,TW3MovableControl.GetHeight$(Self.FNo));
            }
         } else if ((1<<Self.FOptions&36)!=0) {
            dy$4 = hd$2-(TW3MovableControl.GetHeight$(Self.FYes)+8);
            TW3MovableControl.SetBounds$2(Self.FYes,8,dy$4,$Div(wd$2,2),TW3MovableControl.GetHeight$(Self.FYes));
            dx$3 = TW3ScrollInfo.GetScrollWidth(TW3CustomControl.GetScrollInfo(Self))-($Div(wd$2,2));
            (dx$3-= 8);
            TW3MovableControl.SetBounds$2(Self.FNo,dx$3,dy$4,$Div(wd$2,2),TW3MovableControl.GetHeight$(Self.FNo));
         }
      }
   }
   /// procedure TW3AlertDialog.SetupDialog(aTitle: String; aText: String; aOptions: TW3AlertOptions)
   ///  [line: 123, column: 26, file: SmartCL.Dialogs]
   ,SetupDialog:function(Self, aTitle, aText$1, aOptions) {
      if (!Self.FReady) {
         TW3TagObj.BeginUpdate(Self);
         try {
            Self.FOptions = aOptions;
            TW3Label.SetCaption$1(Self.FTitle,aTitle);
            TW3Label.SetCaption$1(Self.FText,aText$1);
            switch (Self.FOptions) {
               case 0 :
               case 3 :
                  TW3MovableControl.SetVisible(Self.FYes,true);
                  TW3MovableControl.SetVisible(Self.FNo,false);
                  break;
               case 1 :
               case 4 :
                  TW3MovableControl.SetVisible(Self.FNo,true);
                  TW3MovableControl.SetVisible(Self.FYes,false);
                  break;
               case 2 :
               case 5 :
                  TW3MovableControl.SetVisible(Self.FYes,true);
                  TW3MovableControl.SetVisible(Self.FNo,true);
                  break;
            }
            switch (Self.FOptions) {
               case 0 :
                  TW3Button.SetCaption(Self.FYes,"Yes");
                  break;
               case 1 :
                  TW3Button.SetCaption(Self.FNo,"No");
                  break;
               case 3 :
                  TW3Button.SetCaption(Self.FYes,"OK");
                  break;
               case 4 :
                  TW3Button.SetCaption(Self.FNo,"Cancel");
                  break;
               case 2 :
                  TW3Button.SetCaption(Self.FYes,"Yes");
                  TW3Button.SetCaption(Self.FNo,"No");
                  break;
               case 5 :
                  TW3Button.SetCaption(Self.FYes,"OK");
                  TW3Button.SetCaption(Self.FNo,"Cancel");
                  break;
            }
            TW3CustomFont.SetName$1(TW3CustomControl.GetFont(Self.FTitle),"Helvetica, Arial, sans-serif");
            TW3CustomFont.SetWeight(TW3CustomControl.GetFont(Self.FTitle),"bold");
            TW3CustomFont.SetSize$5(TW3CustomControl.GetFont(Self.FTitle),24);
            TW3Label.SetTextAlign$1(Self.FTitle,1);
            TW3CustomFont.SetColor$2(TW3CustomControl.GetFont(Self.FTitle),16777215);
            Self.FTitle.FContainer.FHandle.style["text-shadow"] = "0 -1px 0 rgba(0,0,0,.8)";
            TW3CustomFont.SetSize$5(TW3CustomControl.GetFont(Self.FText),16);
            TW3CustomFont.SetName$1(TW3CustomControl.GetFont(Self.FText),"Helvetica, Arial, sans-serif");
            TW3Label.SetTextAlign$1(Self.FText,1);
            Self.FReady = true;
         } finally {
            TW3MovableControl.SetWasSized(Self);
            TW3MovableControl.SetWasMoved(Self);
            TW3TagObj.EndUpdate(Self);
         }
      }
   }
   /// procedure TW3AlertDialog.StyleTagObject()
   ///  [line: 96, column: 26, file: SmartCL.Dialogs]
   ,StyleTagObject:function(Self) {
      TW3CustomControl.StyleTagObject(Self);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,StyleTagObject$:function($){return $.ClassType.StyleTagObject($)}
   ,Create$19:TW3CustomControl.Create$19
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,GetEnabled:TW3CustomControl.GetEnabled
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
};
TW3AlertDialog.$Intf={
   IW3AlertDialog:[TW3AlertDialog.SetupDialog]
}
/// TW3Button = class (TW3CustomControl)
///  [line: 18, column: 3, file: SmartCL.Controls.Button]
var TW3Button = {
   $ClassName:"TW3Button",
   $Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FIgnoreMouse = 0;
      $.FPressed = false;
      $.FTouchEnd = null;
      $.FTouchMove = null;
      $.FTouchX = $.FTouchY = 0;
   }
   /// procedure TW3Button.CBClick(eventObj: JEvent)
   ///  [line: 165, column: 21, file: SmartCL.Controls.Button]
   ,CBClick:function(Self, eventObj$18) {
      if (Self.FPressed) {
         TW3Button.ResetClick(Self);
         TW3CustomControl.CBClick(Self,eventObj$18);
      } else {
         TW3Button.ResetClick(Self);
      }
   }
   /// procedure TW3Button.CBKeyDown(eventObj: JKeyboardEvent)
   ///  [line: 173, column: 21, file: SmartCL.Controls.Button]
   ,CBKeyDown:function(Self, eventObj$19) {
      TW3CustomControl.CBKeyDown(Self,eventObj$19);
      if (TW3CustomControl.GetEnabled$(Self)&&((eventObj$19.keyCode==13)||(eventObj$19.keyCode==32))) {
         TW3Button.SetPressed(Self,true);
      }
   }
   /// procedure TW3Button.CBKeyUp(eventObj: JKeyboardEvent)
   ///  [line: 180, column: 21, file: SmartCL.Controls.Button]
   ,CBKeyUp:function(Self, eventObj$20) {
      TW3CustomControl.CBKeyDown(Self,eventObj$20);
      switch (eventObj$20.keyCode) {
         case 13 :
         case 32 :
            if (TW3CustomControl.GetEnabled$(Self)&&Self.FPressed) {
               TW3CustomControl.CBClick$(Self,eventObj$20);
            }
            break;
         case 27 :
            TW3Button.SetPressed(Self,false);
            break;
      }
   }
   /// procedure TW3Button.CBMouseDown(eventObj: JMouseEvent)
   ///  [line: 141, column: 21, file: SmartCL.Controls.Button]
   ,CBMouseDown:function(Self, eventObj$21) {
      TW3CustomControl.CBMouseDown(Self,eventObj$21);
      if (PerformanceTimer.Now$1()<Self.FIgnoreMouse) {
         return;
      }
      if (TW3CustomControl.GetEnabled$(Self)&&(eventObj$21.button==0)) {
         TW3Button.SetPressed(Self,true);
         TW3CustomControl.SetCapture(Self);
      }
   }
   /// procedure TW3Button.CBMouseMove(eventObj: JMouseEvent)
   ///  [line: 158, column: 21, file: SmartCL.Controls.Button]
   ,CBMouseMove:function(Self, eventObj$22) {
      TW3CustomControl.CBMouseMove(Self,eventObj$22);
      if (TW3CustomControl.a$7(Self)) {
         TW3Button.SetPressed(Self,TRect$ContainsPos$1(TW3MovableControl.ScreenRect(Self),eventObj$22.clientX,eventObj$22.clientY));
      }
   }
   /// procedure TW3Button.CBMouseUp(eventObj: JMouseEvent)
   ///  [line: 151, column: 21, file: SmartCL.Controls.Button]
   ,CBMouseUp:function(Self, eventObj$23) {
      TW3CustomControl.CBMouseUp(Self,eventObj$23);
      if (TW3CustomControl.a$7(Self)&&(eventObj$23.button==0)) {
         TW3CustomControl.CBClick$(Self,eventObj$23);
      }
   }
   /// function TW3Button.GetCaption() : String
   ///  [line: 58, column: 20, file: SmartCL.Controls.Button]
   ,GetCaption:function(Self) {
      var Result = "";
      if (Self.FHandle) {
         Result = ""+Self.FHandle.innerHTML;
      }
      return Result
   }
   /// procedure TW3Button.InitializeObject()
   ///  [line: 70, column: 21, file: SmartCL.Controls.Button]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      TW3MovableControl.SetWidth$(Self,100);
      TW3MovableControl.SetHeight$(Self,32);
      Self.FHandle.addEventListener("touchstart",function (e$12) {
         var t = null;
         if (!TW3CustomControl.GetEnabled$(Self)) {
            return;
         }
         if (Self.FPressed) {
            return;
         }
         TW3Button.SetPressed(Self,true);
         e$12.stopPropagation();
         Self.FHandle.addEventListener("touchmove",Self.FTouchMove,false);
         document.body.addEventListener("touchend",Self.FTouchEnd,false);
         t = e$12.touches[0];
         Self.FTouchX = t.clientX;
         Self.FTouchY = t.clientY;
      },false);
      Self.FTouchMove = function (e$13) {
         var t$1 = null;
         t$1 = e$13.touches[0];
         if ((Math.abs(t$1.clientX-Self.FTouchX)>10)||(Math.abs(t$1.clientY-Self.FTouchY)>10)) {
            TW3Button.ResetClick(Self);
         }
      };
      Self.FTouchEnd = function (e$14) {
         TW3CustomControl.CBClick$(Self,e$14);
         Self.FIgnoreMouse = PerformanceTimer.Now$1()+1000;
      };
      TW3CustomControl._setMouseDown(Self,null);
      TW3CustomControl._setMouseUp(Self,null);
      TW3CustomControl._setMouseMove(Self,null);
      TW3CustomControl._setKeyDown(Self,null);
      TW3CustomControl._setKeyUp(Self,null);
   }
   /// function TW3Button.MakeElementTagObj() : THandle
   ///  [line: 115, column: 20, file: SmartCL.Controls.Button]
   ,MakeElementTagObj:function(Self) {
      return w3_createHtmlElement("button");
   }
   /// procedure TW3Button.ResetClick()
   ///  [line: 130, column: 21, file: SmartCL.Controls.Button]
   ,ResetClick:function(Self) {
      TW3Button.SetPressed(Self,false);
      if (TW3CustomControl.a$7(Self)) {
         TW3CustomControl.ReleaseCapture(Self);
      } else {
         Self.FHandle.removeEventListener("touchmove",Self.FTouchMove,false);
         document.body.removeEventListener("touchend",Self.FTouchEnd,false);
      }
   }
   /// procedure TW3Button.SetCaption(Value: String)
   ///  [line: 64, column: 21, file: SmartCL.Controls.Button]
   ,SetCaption:function(Self, Value$10) {
      if (Self.FHandle) {
         Self.FHandle.innerHTML = Value$10;
      }
   }
   /// procedure TW3Button.SetPressed(value: Boolean)
   ///  [line: 120, column: 21, file: SmartCL.Controls.Button]
   ,SetPressed:function(Self, value$4) {
      if (Self.FPressed!=value$4) {
         Self.FPressed = value$4;
         if (value$4) {
            w3_AddClass(Self.FHandle,PressedCSSClass);
         } else {
            w3_RemoveClass(Self.FHandle,PressedCSSClass);
         }
      }
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,StyleTagObject:TW3CustomControl.StyleTagObject
   ,Create$19:TW3CustomControl.Create$19
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick$:function($){return $.ClassType.CBClick.apply($.ClassType, arguments)}
   ,CBKeyDown$:function($){return $.ClassType.CBKeyDown.apply($.ClassType, arguments)}
   ,CBKeyUp$:function($){return $.ClassType.CBKeyUp.apply($.ClassType, arguments)}
   ,CBMouseDown$:function($){return $.ClassType.CBMouseDown.apply($.ClassType, arguments)}
   ,CBMouseMove$:function($){return $.ClassType.CBMouseMove.apply($.ClassType, arguments)}
   ,CBMouseUp$:function($){return $.ClassType.CBMouseUp.apply($.ClassType, arguments)}
   ,GetEnabled:TW3CustomControl.GetEnabled
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
};
/// TW3AlertButton = class (TW3Button)
///  [line: 31, column: 3, file: SmartCL.Dialogs]
var TW3AlertButton = {
   $ClassName:"TW3AlertButton",
   $Parent:TW3Button
   ,$Init:function ($) {
      TW3Button.$Init($);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3Button.InitializeObject
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3Button.MakeElementTagObj
   ,StyleTagObject:TW3CustomControl.StyleTagObject
   ,Create$19:TW3CustomControl.Create$19
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3Button.CBClick
   ,CBKeyDown:TW3Button.CBKeyDown
   ,CBKeyUp:TW3Button.CBKeyUp
   ,CBMouseDown:TW3Button.CBMouseDown
   ,CBMouseMove:TW3Button.CBMouseMove
   ,CBMouseUp:TW3Button.CBMouseUp
   ,GetEnabled:TW3CustomControl.GetEnabled
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
};
/// TW3LabelText = class (TW3CustomControl)
///  [line: 19, column: 3, file: SmartCL.Controls.Label]
var TW3LabelText = {
   $ClassName:"TW3LabelText",
   $Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,StyleTagObject:TW3CustomControl.StyleTagObject
   ,Create$19:TW3CustomControl.Create$19
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,GetEnabled:TW3CustomControl.GetEnabled
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
};
/// TW3Label = class (TW3CustomControl)
///  [line: 22, column: 3, file: SmartCL.Controls.Label]
var TW3Label = {
   $ClassName:"TW3Label",
   $Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FCaption$1 = "";
      $.FContainer = null;
      $.FTextAlign = 0;
   }
   /// procedure TW3Label.FinalizeObject()
   ///  [line: 65, column: 20, file: SmartCL.Controls.Label]
   ,FinalizeObject:function(Self) {
      TObject.Free(Self.FContainer);
      TW3CustomControl.FinalizeObject(Self);
   }
   /// procedure TW3Label.InitializeObject()
   ///  [line: 50, column: 20, file: SmartCL.Controls.Label]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      Self.FContainer = TW3Component.Create$19$($New(TW3LabelText),Self);
      w3_setCssStyle(Self.FContainer.FHandle,"text-overflow","ellipsis");
      w3_setCssStyle(Self.FContainer.FHandle,"-o-text-overflow","ellipsis");
      w3_setCssStyle(Self.FContainer.FHandle,"white-space","nowrap");
      w3_setCssStyle(Self.FContainer.FHandle,"overflow","hidden");
      w3_setCssStyle(Self.FContainer.FHandle,w3_CSSPrefixDef("vertical-align"),"middle");
      TW3Label.SetCaption$1(Self,"Label");
      TW3MovableControl.SetHeight$(Self,12);
   }
   /// function TW3Label.MakeElementTagObj() : THandle
   ///  [line: 76, column: 19, file: SmartCL.Controls.Label]
   ,MakeElementTagObj:function(Self) {
      return w3_createHtmlElement("fieldset");
   }
   /// procedure TW3Label.Resize()
   ///  [line: 81, column: 20, file: SmartCL.Controls.Label]
   ,Resize:function(Self) {
      var dx$4 = 0;
      var dy$5 = 0;
      var wd$3 = 0;
      var hd$3 = 0;
      TW3MovableControl.Resize(Self);
      TW3TagObj.BeginUpdate(Self.FContainer);
      TW3MovableControl.SetBounds$2(Self.FContainer,0,0,2,2);
      wd$3 = ClampInt(TW3ScrollInfo.GetScrollWidth(TW3CustomControl.GetScrollInfo(Self.FContainer))+2,0,TW3MovableControl.ClientWidth(Self));
      hd$3 = ClampInt(TW3ScrollInfo.GetScrollHeight(TW3CustomControl.GetScrollInfo(Self.FContainer)),0,TW3MovableControl.ClientHeight(Self));
      switch (Self.FTextAlign) {
         case 0 :
            dy$5 = ($Div(TW3MovableControl.ClientHeight(Self),2))-($Div(hd$3,2));
            TW3MovableControl.SetBounds$2(Self.FContainer,0,dy$5,wd$3,hd$3);
            break;
         case 1 :
            dx$4 = ($Div(TW3MovableControl.ClientWidth(Self),2))-($Div(wd$3,2));
            dy$5 = ($Div(TW3MovableControl.ClientHeight(Self),2))-($Div(hd$3,2));
            TW3MovableControl.SetBounds$2(Self.FContainer,dx$4,dy$5,wd$3,hd$3);
            break;
         case 2 :
            dx$4 = TW3MovableControl.ClientWidth(Self)-wd$3;
            dy$5 = ($Div(TW3MovableControl.ClientHeight(Self),2))-($Div(hd$3,2));
            TW3MovableControl.SetBounds$2(Self.FContainer,dx$4,dy$5,wd$3,hd$3);
            break;
      }
      TW3TagObj.EndUpdate(Self.FContainer);
   }
   /// procedure TW3Label.SetCaption(const aValue: String)
   ///  [line: 116, column: 20, file: SmartCL.Controls.Label]
   ,SetCaption$1:function(Self, aValue$63) {
      if (aValue$63!=Self.FCaption$1) {
         TW3TagObj.BeginUpdate(Self);
         Self.FCaption$1 = aValue$63;
         TW3TagObj.SetInnerHTML(Self.FContainer,aValue$63);
         TW3MovableControl.SetWasSized(Self);
         TW3MovableControl.SetWasMoved(Self);
         TW3TagObj.EndUpdate(Self);
      }
   }
   /// procedure TW3Label.SetEnabled(aValue: Boolean)
   ///  [line: 129, column: 20, file: SmartCL.Controls.Label]
   ,SetEnabled:function(Self, aValue$64) {
      TW3CustomControl.SetEnabled(Self,aValue$64);
      TW3CustomControl.SetEnabled$(Self.FContainer,aValue$64);
   }
   /// procedure TW3Label.SetTextAlign(aNewAlignment: TTextAlign)
   ///  [line: 135, column: 20, file: SmartCL.Controls.Label]
   ,SetTextAlign$1:function(Self, aNewAlignment) {
      var AlignmentText = "";
      TW3TagObj.BeginUpdate(Self);
      Self.FTextAlign = aNewAlignment;
      switch (aNewAlignment) {
         case 0 :
            AlignmentText = "left";
            break;
         case 1 :
            AlignmentText = "center";
            break;
         case 2 :
            AlignmentText = "right";
            break;
      }
      w3_setCssStyle(Self.FContainer.FHandle,"text-align",AlignmentText);
      TW3MovableControl.SetWasSized(Self);
      TW3MovableControl.SetWasMoved(Self);
      TW3TagObj.EndUpdate(Self);
   }
   /// function TW3Label.supportAdjustment() : Boolean
   ///  [line: 71, column: 25, file: SmartCL.Controls.Label]
   ,supportAdjustment:function(Self) {
      return false;
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject$:function($){return $.ClassType.FinalizeObject($)}
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,StyleTagObject:TW3CustomControl.StyleTagObject
   ,Create$19:TW3CustomControl.Create$19
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment$:function($){return $.supportAdjustment($)}
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,GetEnabled:TW3CustomControl.GetEnabled
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled$:function($){return $.ClassType.SetEnabled.apply($.ClassType, arguments)}
};
/// TTextAlign enumeration
///  [line: 17, column: 3, file: SmartCL.Controls.Label]
var TTextAlign = [ "taLeft", "taCenter", "taRight" ];
/// PerformanceTimer = class (TObject)
///  [line: 15, column: 3, file: System.Diagnostics]
var PerformanceTimer = {
   $ClassName:"PerformanceTimer",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// procedure PerformanceTimer.PrepareGetNow()
   ///  [line: 56, column: 34, file: System.Diagnostics]
   ,PrepareGetNow:function() {
      
    if (window.performance && performance.now) {
      vGetNow = performance;
      vIsHighResolution = true;
    } else {
      vIsHighResolution = false;
      if (!Date.now) { Date.now = function (){ return +(new Date) } };
      vGetNow = Date;
    }
     }
   /// function PerformanceTimer.Now() : Float
   ///  [line: 49, column: 33, file: System.Diagnostics]
   ,Now$1:function() {
      var Result = 0;
      if (!vGetNow) {
         PerformanceTimer.PrepareGetNow();
      }
      Result = Number(vGetNow.now());
      return Result
   }
   ,Destroy:TObject.Destroy
};
/// TForm1 = class (TW3Form)
///  [line: 38, column: 3, file: Form1]
var TForm1 = {
   $ClassName:"TForm1",
   $Parent:TW3Form
   ,$Init:function ($) {
      TW3Form.$Init($);
      $.W3Image2 = null;
   }
   /// procedure TForm1.InitializeForm()
   ///  [line: 151, column: 18, file: Form1]
   ,InitializeForm:function(Self) {
      var x$32 = 0;
      var dx$5 = 0;
      var dy$6 = 0;
      var mObj$10 = null;
      TW3CustomForm.InitializeForm(Self);
      Randomize();
      for(x$32 = 1;x$32<=100;x$32++) {
         dx$5 = TInteger.ToNearest(RandomInt(900),80);
         dy$6 = RandomInt(400-(40*x$32));
         mObj$10 = TW3Component.Create$19$($New(TCharacter),Self);
         mObj$10.FX = dx$5;
         mObj$10.FY = dy$6;
         TW3MovableControl.SetWidth$(mObj$10,80);
         TW3MovableControl.SetHeight$(mObj$10,80);
         TW3ControlBackground.FromColor$1(TW3MovableControl.GetBackGround(mObj$10),RGBToColor(RandomInt(255),RandomInt(255),RandomInt(255)));
         TW3Sprite.Update3d(mObj$10);
      }
      TQTXRuntime.Execute$2(TQTXRuntime,$Event0(Self,TForm1.Update_game),(-1),16);
   }
   /// procedure TForm1.InitializeObject()
   ///  [line: 177, column: 18, file: Form1]
   ,InitializeObject:function(Self) {
      TW3CustomControl.InitializeObject(Self);
      TW3CustomForm.setCaption(Self,"W3Form");
      TW3Component.SetName(Self,"Form1");
      Self.W3Image2 = TW3Component.Create$19$($New(TW3Image),Self);
      TW3Image.setSrc(Self.W3Image2,"res/pattern.png");
      TW3MovableControl.SetWidth$(Self.W3Image2,112);
      TW3MovableControl.SetTop(Self.W3Image2,504);
      TW3MovableControl.SetLeft(Self.W3Image2,104);
      TW3MovableControl.SetHeight$(Self.W3Image2,112);
      TW3Component.SetName(Self.W3Image2,"W3Image2");
   }
   /// procedure TForm1.Resize()
   ///  [line: 184, column: 18, file: Form1]
   ,Resize:function(Self) {
      TW3MovableControl.Resize(Self);
   }
   /// procedure TForm1.Update_game()
   ///  [line: 190, column: 18, file: Form1]
   ,Update_game:function(Self) {
      var x$33 = 0;
      var mObj$11 = null;
      var $temp31;
      for(x$33 = 0,$temp31 = TW3Component.GetChildCount(Self);x$33<$temp31;x$33++) {
         mObj$11 = TW3Component.GetChildObject(Self,x$33);
         if ($Is(mObj$11,TCharacter)) {
            w3_RequestAnimationFrame($Event0($As(mObj$11,TCharacter),TCharacter.UpdatePos));
         }
      }
   }
   ,Destroy:TW3CustomForm.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,StyleTagObject:TW3CustomForm.StyleTagObject
   ,Create$19:TW3CustomForm.Create$19
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Resize$:function($){return $.ClassType.Resize($)}
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,GetEnabled:TW3CustomControl.GetEnabled
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
   ,InitializeForm$:function($){return $.ClassType.InitializeForm($)}
};
/// TW3Sprite = class (TW3MovableControl)
///  [line: 33, column: 3, file: SmartCL.Sprite3D]
var TW3Sprite = {
   $ClassName:"TW3Sprite",
   $Parent:TW3MovableControl
   ,$Init:function ($) {
      TW3MovableControl.$Init($);
      $.FFlags = 0;
      $.FRegX = $.FRegY = $.FRegZ = $.FRotX = $.FRotY = $.FRotZ = $.FScaleX = $.FScaleY = $.FScaleZ = $.FX = $.FY = $.FZ = 0;
   }
   /// procedure TW3Sprite.InitializeObject()
   ///  [line: 93, column: 22, file: SmartCL.Sprite3D]
   ,InitializeObject:function(Self) {
      TW3MovableControl.InitializeObject(Self);
      TW3MovableControl.SetVisible(Self,true);
      Self.FScaleX = 1;
      Self.FScaleY = 1;
      Self.FScaleZ = 1;
      Self.FFlags = 31;
      Self.FHandle.style[w3_CSSPrefix("transformStyle")] = "preserve-3d";
      Self.FHandle.style[w3_CSSPrefix("Perspective")] = 800;
      Self.FHandle.style[w3_CSSPrefix("transformOrigin")] = "50% 50%";
      Self.FHandle.style[w3_CSSPrefix("Transform")] = "translateZ(0px)";
      TW3Sprite.Update3d(Self);
   }
   /// procedure TW3Sprite.Update3d()
   ///  [line: 212, column: 21, file: SmartCL.Sprite3D]
   ,Update3d:function(Self) {
      var mTemp$3 = "";
      if ((Self.FFlags&1)==1) {
         mTemp$3 = "translate3d("+FloatToStr$_Float_(Self.FX-Self.FRegX)+"px,"+FloatToStr$_Float_(Self.FY-Self.FRegY)+"px,"+FloatToStr$_Float_(Self.FZ-Self.FRegZ)+"px) ";
      }
      if ((Self.FFlags&2)==2) {
         mTemp$3 = mTemp$3+"rotateX("+FloatToStr$_Float_(Self.FRotX)+"deg) ";
      }
      if ((Self.FFlags&4)==4) {
         mTemp$3 = mTemp$3+"rotateY("+FloatToStr$_Float_(Self.FRotY)+"deg) ";
      }
      if ((Self.FFlags&8)==8) {
         mTemp$3 = mTemp$3+"rotateZ("+FloatToStr$_Float_(Self.FRotZ)+"deg) ";
      }
      if ((Self.FFlags&16)==16) {
         mTemp$3 = mTemp$3+"scale3d("+FloatToStr$_Float_(Self.FScaleX)+","+FloatToStr$_Float_(Self.FScaleY)+","+FloatToStr$_Float_(Self.FScaleZ)+") ";
      }
      Self.FHandle.style[w3_CSSPrefix("Transform")] = mTemp$3;
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,FinalizeObject:TW3MovableControl.FinalizeObject
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,StyleTagObject:TW3TagObj.StyleTagObject
   ,Create$19:TW3Component.Create$19
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
};
/// TCharacter = class (TW3Sprite)
///  [line: 20, column: 3, file: Form1]
var TCharacter = {
   $ClassName:"TCharacter",
   $Parent:TW3Sprite
   ,$Init:function ($) {
      TW3Sprite.$Init($);
      $.FVel = 0.25;
   }
   /// function TCharacter.BoundsRect3d() : TRectF
   ///  [line: 94, column: 21, file: Form1]
   ,BoundsRect3d:function(Self) {
      var Result = {Bottom:0,Left:0,Right:0,Top:0};
      Result.Left = Self.FX;
      Result.Top = Self.FY;
      Result.Right = Self.FX+TW3MovableControl.GetWidth$(Self);
      Result.Bottom = Self.FY+TW3MovableControl.GetHeight$(Self);
      return Result
   }
   /// function TCharacter.CheckCollision() : Boolean
   ///  [line: 63, column: 21, file: Form1]
   ,CheckCollision:function(Self) {
      var Result = false;
      var z = 0;
      var mParent = null;
      var mObj$12 = null;
      var mRef$27 = null;
      var mSrc = {Bottom:0,Left:0,Right:0,Top:0};
      var mDst = {Bottom:0,Left:0,Right:0,Top:0};
      mParent = $As(Self.FParent,TW3CustomControl);
      mSrc = TCharacter.BoundsRect3d(Self);
      var $temp32;
      for(z = 0,$temp32 = TW3Component.GetChildCount(mParent);z<$temp32;z++) {
         mRef$27 = TW3Component.GetChildObject(mParent,z);
         if ($Is(mRef$27,TW3Sprite)) {
            mObj$12 = $As(mRef$27,TCharacter);
            if (mObj$12!==Self) {
               mDst = TCharacter.BoundsRect3d(mObj$12);
               if (TRectF$Expose(mSrc,mDst)!=2) {
                  Result = true;
                  break;
               }
            }
         }
      }
      return Result
   }
   /// procedure TCharacter.InitializeObject()
   ///  [line: 58, column: 22, file: Form1]
   ,InitializeObject:function(Self) {
      TW3Sprite.InitializeObject(Self);
   }
   /// procedure TCharacter.UpdatePos()
   ///  [line: 102, column: 22, file: Form1]
   ,UpdatePos:function(Self) {
      var mParent$1 = null;
      var FGround = 0;
      var dx$6 = 0;
      var dy$7 = 0;
      var mTile = null;
      var mNewY = 0;
      Self.FVel+=0.99;
      mNewY = Self.FY+Self.FVel;
      if (Math.round(mNewY)!=Math.round(Self.FY)) {
         Self.FY = mNewY;
         TW3Sprite.Update3d(Self);
      } else {
         return;
      }
      Self.FVel-=0.24;
      mParent$1 = $As(Self.FParent,TW3CustomControl);
      if (TCharacter.CheckCollision(Self)) {
         dx$6 = Self.FX+(TW3MovableControl.GetWidth$(Self)/2);
         dy$7 = Self.FY+TW3MovableControl.GetHeight$(Self)+1;
         mTile = TW3MovableControl.ControlAtPoint(mParent$1,Math.round(dx$6),Math.round(dy$7),false);
         if (((mTile!==null)&&$Is(mTile,TCharacter))&&($As(mTile,TW3Sprite).FY>Self.FY)) {
            FGround = $As(mTile,TCharacter).FY;
         } else {
            FGround = TW3MovableControl.ClientHeight(mParent$1);
         }
      } else {
         FGround = TW3MovableControl.ClientHeight(mParent$1);
      }
      if ((Self.FY+TW3MovableControl.GetHeight$(Self))>FGround) {
         Self.FY = FGround-TW3MovableControl.GetHeight$(Self);
         TW3Sprite.Update3d(Self);
         Self.FVel = -Math.abs((Self.FVel/100)*60);
      }
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3MovableControl.AfterUpdate
   ,FinalizeObject:TW3MovableControl.FinalizeObject
   ,InitializeObject$:function($){return $.ClassType.InitializeObject($)}
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj:TW3TagObj.MakeElementTagObj
   ,StyleTagObject:TW3TagObj.StyleTagObject
   ,Create$19:TW3Component.Create$19
   ,GetHeight:TW3MovableControl.GetHeight
   ,GetWidth:TW3MovableControl.GetWidth
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
};
/// TQTXRuntime = class (TObject)
///  [line: 51, column: 3, file: qtx.runtime]
var TQTXRuntime = {
   $ClassName:"TQTXRuntime",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
   }
   /// function TQTXRuntime.DelayedDispatch(const OnEntry: TProcedureRef; const aDelay: Integer) : THandle
   ///  [line: 86, column: 28, file: qtx.runtime]
   ,DelayedDispatch:function(Self, OnEntry, aDelay) {
      var Result = undefined;
      
    Result = setTimeout(OnEntry,aDelay);
  return Result
   }
   /// procedure TQTXRuntime.Execute(const OnExecute: TProcedureRef; const aCount: Integer; const aDelay: Integer)
   ///  [line: 114, column: 29, file: qtx.runtime]
   ,Execute$2:function(Self, OnExecute, aCount, aDelay$1) {
      if (OnExecute) {
         if (aCount>0) {
            OnExecute();
            if (aCount>1) {
               TQTXRuntime.DelayedDispatch(Self,function () {
                  TQTXRuntime.Execute$2(Self,OnExecute,(aCount-1),aDelay$1);
               },aDelay$1);
            }
         } else {
            OnExecute();
            TQTXRuntime.DelayedDispatch(Self,function () {
               TQTXRuntime.Execute$2(Self,OnExecute,(-1),aDelay$1);
            },aDelay$1);
         }
      }
   }
   /// function TQTXRuntime.Ready() : Boolean
   ///  [line: 107, column: 28, file: qtx.runtime]
   ,Ready$2:function(Self) {
      var Result = false;
      
    Result = document.readyState == "complete";
  return Result
   }
   /// procedure TQTXRuntime.ExecuteDocumentReady(const OnReady: TProcedureRef)
   ///  [line: 94, column: 29, file: qtx.runtime]
   ,ExecuteDocumentReady:function(Self, OnReady) {
      if (TQTXRuntime.Ready$2(Self)) {
         OnReady();
      } else {
         TQTXRuntime.DelayedDispatch(TQTXRuntime,function () {
            TQTXRuntime.ExecuteDocumentReady(Self,OnReady);
         },100);
      }
   }
   ,Destroy:TObject.Destroy
};
/// TPenStyle enumeration
///  [line: 48, column: 3, file: SMartCL.Legacy]
var TPenStyle = [ "psSolid", "psClear" ];
/// TPaintObject = class (TW3OwnedObject)
///  [line: 57, column: 3, file: SMartCL.Legacy]
var TPaintObject = {
   $ClassName:"TPaintObject",
   $Parent:TW3OwnedObject
   ,$Init:function ($) {
      TW3OwnedObject.$Init($);
      $.a$69 = 0;
      $.FBitmap = $.FPattern = null;
   }
   /// constructor TPaintObject.Create(AOwner: TCanvas)
   ///  [line: 312, column: 26, file: SMartCL.Legacy]
   ,Create$65:function(Self, AOwner$9) {
      TW3OwnedObject.Create$4(Self,AOwner$9);
      Self.FBitmap = TW3Component.Create$19$($New(TW3Image),null);
      TW3Image._setOnLoad(Self.FBitmap,function (sender) {
         Self.FPattern = null;
      });
      return Self
   }
   /// destructor TPaintObject.Destroy()
   ///  [line: 322, column: 25, file: SMartCL.Legacy]
   ,Destroy:function(Self) {
      Self.FPattern = null;
      TW3Image._setOnLoad(Self.FBitmap,null);
      TObject.Free(Self.FBitmap);
      TObject.Destroy(Self);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
   ,AcceptParent:TW3OwnedObject.AcceptParent
   ,Create$4:TW3OwnedObject.Create$4
   ,Create$65$:function($){return $.ClassType.Create$65.apply($.ClassType, arguments)}
};
/// TPen = class (TPaintObject)
///  [line: 81, column: 3, file: SMartCL.Legacy]
var TPen = {
   $ClassName:"TPen",
   $Parent:TPaintObject
   ,$Init:function ($) {
      TPaintObject.$Init($);
      $.a$71 = 0;
      $.a$70 = 0;
   }
   /// constructor TPen.Create(AOwner: TCanvas)
   ///  [line: 367, column: 18, file: SMartCL.Legacy]
   ,Create$65:function(Self, AOwner$10) {
      TPaintObject.Create$65(Self,AOwner$10);
      Self.a$70 = 1;
      Self.a$71 = 0;
      Self.a$69 = 0;
      return Self
   }
   ,Destroy:TPaintObject.Destroy
   ,AcceptParent:TW3OwnedObject.AcceptParent
   ,Create$4:TW3OwnedObject.Create$4
   ,Create$65$:function($){return $.ClassType.Create$65.apply($.ClassType, arguments)}
};
/// TCanvasPatternRepeatMode enumeration
///  [line: 55, column: 3, file: SMartCL.Legacy]
var TCanvasPatternRepeatMode = [ "prRepeat", "prRepeatX", "prRepeatY", "prNoRepeat" ];
/// TCanvas = class (TObject)
///  [line: 88, column: 3, file: SMartCL.Legacy]
var TCanvas = {
   $ClassName:"TCanvas",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FBounds = {Bottom$1:0,Left$1:0,Right$1:0,Top$1:0};
      $.FBrush = $.FContext$3 = $.FDC$1 = $.FPen = $.FTempPxl = null;
      $.FHeight$1 = $.FWidth$1 = 0;
   }
   /// constructor TCanvas.Create(const aContext: TW3CustomGraphicContext)
   ///  [line: 390, column: 21, file: SMartCL.Legacy]
   ,Create$67:function(Self, aContext) {
      TObject.Create(Self);
      if (aContext) {
         if ((TW3CustomGraphicContext.GetWidth$1$(aContext)>0)&&(TW3CustomGraphicContext.GetHeight$1$(aContext)>0)) {
            Self.FContext$3 = aContext;
            Self.FDC$1 = TW3CustomGraphicContext.GetDC$(Self.FContext$3);
            Self.FWidth$1 = TW3CustomGraphicContext.GetWidth$1$(Self.FContext$3);
            Self.FHeight$1 = TW3CustomGraphicContext.GetHeight$1$(Self.FContext$3);
            Self.FBounds = Create$10(0,0,Self.FWidth$1,Self.FHeight$1);
         }
      }
      Self.FBrush = TPaintObject.Create$65$($New(TBrush),Self);
      Self.FPen = TPaintObject.Create$65$($New(TPen),Self);
      return Self
   }
   /// destructor TCanvas.Destroy()
   ///  [line: 409, column: 20, file: SMartCL.Legacy]
   ,Destroy:function(Self) {
      TObject.Free(Self.FBrush);
      TObject.Free(Self.FPen);
      if (Self.FTempPxl!==null) {
         TObject.Free(Self.FTempPxl);
      }
      Self.FDC$1 = null;
      TObject.Destroy(Self);
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
};
/// TBrushStyle enumeration
///  [line: 43, column: 3, file: SMartCL.Legacy]
var TBrushStyle = [ "bsSolid", "bsClear" ];
/// TBrush = class (TPaintObject)
///  [line: 75, column: 3, file: SMartCL.Legacy]
var TBrush = {
   $ClassName:"TBrush",
   $Parent:TPaintObject
   ,$Init:function ($) {
      TPaintObject.$Init($);
      $.a$72 = 0;
   }
   /// constructor TBrush.Create(AOwner: TCanvas)
   ///  [line: 379, column: 20, file: SMartCL.Legacy]
   ,Create$65:function(Self, AOwner$11) {
      TPaintObject.Create$65(Self,AOwner$11);
      Self.a$69 = 16777215;
      Self.a$72 = 0;
      return Self
   }
   ,Destroy:TPaintObject.Destroy
   ,AcceptParent:TW3OwnedObject.AcceptParent
   ,Create$4:TW3OwnedObject.Create$4
   ,Create$65$:function($){return $.ClassType.Create$65.apply($.ClassType, arguments)}
};
/// TW3Image = class (TW3CustomControl)
///  [line: 19, column: 3, file: SmartCL.Controls.Image]
var TW3Image = {
   $ClassName:"TW3Image",
   $Parent:TW3CustomControl
   ,$Init:function ($) {
      TW3CustomControl.$Init($);
      $.FOnLoad = null;
   }
   /// procedure TW3Image.CBOnLoad()
   ///  [line: 149, column: 20, file: SmartCL.Controls.Image]
   ,CBOnLoad:function(Self) {
      if (Self.FOnLoad) {
         Self.FOnLoad(Self);
      }
   }
   /// procedure TW3Image.Clear()
   ///  [line: 155, column: 20, file: SmartCL.Controls.Image]
   ,Clear$6:function(Self) {
      TW3Image.setSrc(Self,"");
   }
   /// function TW3Image.getEnabled() : Boolean
   ///  [line: 91, column: 19, file: SmartCL.Controls.Image]
   ,GetEnabled:function(Self) {
      return true;
   }
   /// function TW3Image.getHeight() : Integer
   ///  [line: 127, column: 19, file: SmartCL.Controls.Image]
   ,GetHeight:function(Self) {
      var Result = 0;
      Result = TW3MovableControl.GetHeight(Self);
      if (!Result) {
         if (Self.FHandle) {
            Result = parseInt(Self.FHandle.height,10);
         }
      }
      return Result
   }
   /// function TW3Image.getReady() : Boolean
   ///  [line: 77, column: 19, file: SmartCL.Controls.Image]
   ,getReady:function(Self) {
      var Result = false;
      if (Self.FHandle) {
         Result = (Self.FHandle.complete&&(Self.FHandle.naturalWidth>0))&&(Self.FHandle.naturalHeight>0);
      }
      return Result
   }
   /// function TW3Image.getSrc() : String
   ///  [line: 85, column: 19, file: SmartCL.Controls.Image]
   ,getSrc:function(Self) {
      var Result = "";
      if (Self.FHandle) {
         Result = ""+Self.FHandle.src;
      }
      return Result
   }
   /// function TW3Image.getWidth() : Integer
   ///  [line: 112, column: 19, file: SmartCL.Controls.Image]
   ,GetWidth:function(Self) {
      var Result = 0;
      Result = TW3MovableControl.GetWidth(Self);
      if (!Result) {
         if (Self.FHandle) {
            Result = parseInt(Self.FHandle.width,10);
         }
      }
      return Result
   }
   /// function TW3Image.makeElementTagObj() : THandle
   ///  [line: 72, column: 19, file: SmartCL.Controls.Image]
   ,MakeElementTagObj:function(Self) {
      return w3_createHtmlElement("img");
   }
   /// procedure TW3Image.setSrc(Value: String)
   ///  [line: 204, column: 20, file: SmartCL.Controls.Image]
   ,setSrc:function(Self, Value$11) {
      if (Value$11!=TW3Image.getSrc(Self)) {
         w3_setAttrib(Self.FHandle,"src",Value$11);
      }
   }
   /// procedure TW3Image._setOnLoad(aValue: TNotifyEvent)
   ///  [line: 140, column: 20, file: SmartCL.Controls.Image]
   ,_setOnLoad:function(Self, aValue$65) {
      Self.FOnLoad = aValue$65;
      w3_bind2(Self.FHandle,"onload",(aValue$65)?$Event0(Self,TW3Image.CBOnLoad):$Event0(Self,TW3Component.CBNoBehavior));
   }
   ,Destroy:TW3TagObj.Destroy
   ,AfterUpdate:TW3CustomControl.AfterUpdate
   ,FinalizeObject:TW3CustomControl.FinalizeObject
   ,InitializeObject:TW3CustomControl.InitializeObject
   ,MakeElementTagId:TW3TagObj.MakeElementTagId
   ,MakeElementTagObj$:function($){return $.ClassType.MakeElementTagObj($)}
   ,StyleTagObject:TW3CustomControl.StyleTagObject
   ,Create$19:TW3CustomControl.Create$19
   ,GetHeight$:function($){return $.ClassType.GetHeight($)}
   ,GetWidth$:function($){return $.ClassType.GetWidth($)}
   ,Resize:TW3MovableControl.Resize
   ,SetHeight:TW3MovableControl.SetHeight
   ,SetWidth:TW3MovableControl.SetWidth
   ,supportAdjustment:TW3MovableControl.supportAdjustment
   ,CBClick:TW3CustomControl.CBClick
   ,CBKeyDown:TW3CustomControl.CBKeyDown
   ,CBKeyUp:TW3CustomControl.CBKeyUp
   ,CBMouseDown:TW3CustomControl.CBMouseDown
   ,CBMouseMove:TW3CustomControl.CBMouseMove
   ,CBMouseUp:TW3CustomControl.CBMouseUp
   ,GetEnabled$:function($){return $.ClassType.GetEnabled($)}
   ,Invalidate:TW3CustomControl.Invalidate
   ,SetEnabled:TW3CustomControl.SetEnabled
};
/// function TQTXVariantHelper.IsArray(const Self: Variant) : Boolean
///  [line: 201, column: 28, file: qtx.helpers]
function TQTXVariantHelper$IsArray(Self$11) {
   var Result = false;
   
    Result = ((Self$11) !== undefined)
      && (typeof Self$11 !== null)
      && (typeof Self$11 === "object")
      && ((Self$11).length !== undefined);
  return Result
}
/// function TQTXVariantHelper.IsBoolean(const Self: Variant) : Boolean
///  [line: 163, column: 28, file: qtx.helpers]
function TQTXVariantHelper$IsBoolean(Self$12) {
   var Result = false;
   
    Result = ((Self$12) !== undefined)
      && (typeof Self$12 !== null)
      && (typeof Self$12  === "boolean");
  return Result
}
/// function TQTXVariantHelper.IsFloat(const Self: Variant) : Boolean
///  [line: 181, column: 28, file: qtx.helpers]
function TQTXVariantHelper$IsFloat(Self$13) {
   var Result = false;
   
    Result = ((Self$13) !== undefined)
      && (typeof Self$13 !== null)
      && (typeof Self$13  === "number")
      && (Math.round(Self$13) != Self$13);
  return Result
}
/// function TQTXVariantHelper.IsFunction(const Self: Variant) : Boolean
///  [line: 154, column: 28, file: qtx.helpers]
function TQTXVariantHelper$IsFunction(Self$14) {
   var Result = false;
   
    Result = ((Self$14) !== undefined)
      && (typeof Self$14 !== null)
      && (typeof Self$14  === "function");
  return Result
}
/// function TQTXVariantHelper.IsInteger(const Self: Variant) : Boolean
///  [line: 191, column: 28, file: qtx.helpers]
function TQTXVariantHelper$IsInteger$1(Self$15) {
   var Result = false;
   
    Result = ((Self$15) !== undefined)
      && (typeof Self$15 !== null)
      && (typeof Self$15  === "number")
      && (Math.round(Self$15) === Self$15);
  return Result
}
/// function TQTXVariantHelper.IsObject(const Self: Variant) : Boolean
///  [line: 135, column: 28, file: qtx.helpers]
function TQTXVariantHelper$IsObject(Self$16) {
   var Result = false;
   
    Result = ((Self$16) !== undefined)
      && (typeof Self$16 !== null)
      && (typeof Self$16  === "object")
      && ((Self$16).length === undefined);
  return Result
}
/// function TQTXVariantHelper.IsString(const Self: Variant) : Boolean
///  [line: 172, column: 28, file: qtx.helpers]
function TQTXVariantHelper$IsString$1(Self$17) {
   var Result = false;
   
    Result = ((Self$17) !== undefined)
      && (typeof Self$17 !== null)
      && (typeof Self$17  === "string");
  return Result
}
/// function TQTXVariantHelper.IsSymbol(const Self: Variant) : Boolean
///  [line: 145, column: 28, file: qtx.helpers]
function TQTXVariantHelper$IsSymbol(Self$18) {
   var Result = false;
   
    Result = ((Self$18) !== undefined)
      && (typeof Self$18 !== null)
      && (typeof Self$18  === "symbol");
  return Result
}
/// TQTXVariantDataType enumeration
///  [line: 91, column: 3, file: qtx.helpers]
var TQTXVariantDataType = [ "vdUnknown", "vdBoolean", "vdInteger", "vdFloat", "vdString", "vdSymbol", "vdFunction", "vdObject", "vdArray" ];
/// function TQTXStringHelper.CharCode(const Self: String; const Index: Integer) : Integer
///  [line: 257, column: 27, file: qtx.helpers]
function TQTXStringHelper$CharCode(Self$19, Index) {
   var Result = 0;
   
    Result = (Self$19).charCodeAt(Index);
  return Result
}
/// function TQTXIntegerHelper.ToCharacter(const Self: Integer) : String
///  [line: 362, column: 28, file: qtx.helpers]
function TQTXIntegerHelper$ToCharacter(Self$20) {
   var Result = "";
   
    Result = String.fromCharCode(Self$20);
  return Result
}
/// function TQTXHandleHelper.Null(const Self: THandle) : Boolean
///  [line: 394, column: 27, file: qtx.helpers]
function TQTXHandleHelper$Null(Self$21) {
   var Result = false;
   
    Result = (self == null);
  return Result
}
/// function TQTXHandleHelper.Ready(const Self: THandle) : Boolean
///  [line: 422, column: 27, file: qtx.helpers]
function TQTXHandleHelper$Ready$3(Self$22) {
   var Result = false;
   var mRef$28 = undefined;
   if (TQTXHandleHelper$Valid$2(Self$22)) {
      mRef$28 = TQTXHandleHelper$Root(Self$22);
      Result = TQTXHandleHelper$Valid$2(mRef$28)&&mRef$28.body;
   }
   return Result
}
/// procedure TQTXHandleHelper.ReadyExecute(const Self: THandle; OnReady: TProcedureRef)
///  [line: 440, column: 28, file: qtx.helpers]
function TQTXHandleHelper$ReadyExecute(Self$23, OnReady$1) {
   function DelayedDispatch$1(EntryPoint, Delay) {
      
      setTimeout(EntryPoint,Delay);
       };
   if (TQTXHandleHelper$Valid$2(Self$23)) {
      if (OnReady$1) {
         if (TQTXHandleHelper$Ready$3(Self$23)) {
            OnReady$1();
         } else {
            DelayedDispatch$1(function () {
               TQTXHandleHelper$ReadyExecute(Self$23,OnReady$1);
            },100);
         }
      }
   }
}
/// function TQTXHandleHelper.Root(const Self: THandle) : THandle
///  [line: 373, column: 27, file: qtx.helpers]
function TQTXHandleHelper$Root(Self$24) {
   var Result = undefined;
   var mAncestor = undefined;
   if (TQTXHandleHelper$Valid$2(Self$24)) {
      mAncestor = Self$24;
      while (mAncestor.parentNode) {
         mAncestor = mAncestor.parentNode;
      }
      Result = mAncestor;
   } else {
      Result = TQTXHandleHelper$Null(Self$24);
   }
   return Result
}
/// function TQTXHandleHelper.Valid(const Self: THandle) : Boolean
///  [line: 408, column: 27, file: qtx.helpers]
function TQTXHandleHelper$Valid$2(Self$25) {
   var Result = false;
   
    Result = !( (Self$25 == undefined) || (Self$25 == null) );
  return Result
}
/// TW3JSONP = class (TObject)
///  [line: 119, column: 3, file: SmartCL.Inet]
var TW3JSONP = {
   $ClassName:"TW3JSONP",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FAllocated = false;
      $.FData$2 = undefined;
      $.FHandle$5 = undefined;
      $.FID = 0;
   }
   /// constructor TW3JSONP.Create()
   ///  [line: 264, column: 22, file: SmartCL.Inet]
   ,Create$47:function(Self) {
      Self.FID = ++vJSON_ID;
      return Self
   }
   /// destructor TW3JSONP.Destroy()
   ///  [line: 269, column: 21, file: SmartCL.Inet]
   ,Destroy:function(Self) {
      TW3JSONP.Release$3(Self);
      TObject.Destroy(Self);
   }
   /// procedure TW3JSONP.Release()
   ///  [line: 304, column: 20, file: SmartCL.Inet]
   ,Release$3:function(Self) {
      if (!Self.FAllocated) {
         return;
      }
      Self.FData$2 = null;
      Self.FHandle$5.parent.removeChild(Self.FHandle$5);
      Self.FHandle$5 = null;
      Self.FAllocated = false;
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
};
/// TW3HttpRequest = class (TObject)
///  [line: 69, column: 3, file: SmartCL.Inet]
var TW3HttpRequest = {
   $ClassName:"TW3HttpRequest",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.a$44 = null;
      $.a$43 = null;
      $.a$42 = null;
      $.a$41 = null;
      $.a$40 = null;
      $.FMethod = $.FURL = "";
      $.FReqObj = null;
   }
   /// constructor TW3HttpRequest.Create()
   ///  [line: 325, column: 28, file: SmartCL.Inet]
   ,Create$48:function(Self) {
      TObject.Create(Self);
      Self.FReqObj = new XMLHttpRequest();
      Self.FReqObj.onreadystatechange = $Event0(Self,TW3HttpRequest.HandleReadyStateChange);
      Self.FReqObj.onerror = $Event0(Self,TW3HttpRequest.HandleOnError);
      Self.FReqObj.onload = $Event0(Self,TW3HttpRequest.HandleOnLoad);
      Self.FReqObj.ontimeout = $Event0(Self,TW3HttpRequest.HandleOnTimeout);
      return Self
   }
   /// destructor TW3HttpRequest.Destroy()
   ///  [line: 335, column: 27, file: SmartCL.Inet]
   ,Destroy:function(Self) {
      Self.FReqObj.onreadystatechange = null;
      Self.FReqObj = null;
      TObject.Destroy(Self);
   }
   /// procedure TW3HttpRequest.Get(aURL: String)
   ///  [line: 370, column: 26, file: SmartCL.Inet]
   ,Get$1:function(Self, aURL) {
      TW3HttpRequest.Open(Self,"GET",aURL);
      TW3HttpRequest.Send(Self);
   }
   /// procedure TW3HttpRequest.HandleOnError()
   ///  [line: 352, column: 26, file: SmartCL.Inet]
   ,HandleOnError:function(Self) {
      if (Self.a$43) {
         Self.a$43(Self);
      }
   }
   /// procedure TW3HttpRequest.HandleOnLoad()
   ///  [line: 358, column: 26, file: SmartCL.Inet]
   ,HandleOnLoad:function(Self) {
      if (Self.a$42) {
         Self.a$42(Self);
      }
   }
   /// procedure TW3HttpRequest.HandleOnTimeout()
   ///  [line: 364, column: 26, file: SmartCL.Inet]
   ,HandleOnTimeout:function(Self) {
      if (Self.a$44) {
         Self.a$44(Self);
      }
   }
   /// procedure TW3HttpRequest.HandleReadyStateChange()
   ///  [line: 343, column: 26, file: SmartCL.Inet]
   ,HandleReadyStateChange:function(Self) {
      if ((Self.FReqObj.readyState==4)&&(Self.a$40!==null)) {
         Self.a$40(Self);
      }
      if (Self.a$41) {
         Self.a$41(Self);
      }
   }
   /// procedure TW3HttpRequest.Open(aMeth: String; aURL: String)
   ///  [line: 376, column: 26, file: SmartCL.Inet]
   ,Open:function(Self, aMeth, aURL$1) {
      Self.FMethod = aMeth;
      Self.FURL = aURL$1;
      Self.FReqObj.open(aMeth,aURL$1);
   }
   /// function TW3HttpRequest.ResponseAsMemory() : TMemory
   ///  [line: 402, column: 25, file: SmartCL.Inet]
   ,ResponseAsMemory:function(Self) {
      var Result = null;
      var mView = null;
      var mRef$29 = undefined;
      Result = null;
      if ((Self.FReqObj.readyState==4)&&Self.FReqObj.response) {
         mRef$29 = Self.FReqObj.response;
         if (TVariant.IsString(mRef$29)) {
            Result = TMemory.Create$44($New(TMemory),null);
            TMemory.Write$5(Result,0,(""+mRef$29));
         } else {
            
      mView = new Uint8Array(mRef$29);
      Result = TMemory.Create$44($New(TMemory),new Uint8ClampedArray(mView));
         }
      }
      return Result
   }
   /// procedure TW3HttpRequest.Send()
   ///  [line: 383, column: 26, file: SmartCL.Inet]
   ,Send:function(Self) {
      Self.FReqObj.send();
   }
   ,Destroy$:function($){return $.ClassType.Destroy($)}
};
/// TW3RegEx = class (TObject)
///  [line: 36, column: 3, file: SmartCL.RegEx]
var TW3RegEx = {
   $ClassName:"TW3RegEx",
   $Parent:TObject
   ,$Init:function ($) {
      TObject.$Init($);
      $.FRegEx = null;
   }
   /// constructor TW3RegEx.Create(regularExpression: String; flags: String = '')
   ///  [line: 87, column: 22, file: SmartCL.RegEx]
   ,Create$52:function(Self, regularExpression, flags) {
      if (flags=="") {
         Self.FRegEx = new RegExp(regularExpression);
      } else {
         Self.FRegEx = new RegExp(regularExpression,flags);
      }
      return Self
   }
   /// function TW3RegEx.Match(s: String; var idx: Integer; regularExpression: String; flags: String = '') : TStrArray
   ///  [line: 138, column: 25, file: SmartCL.RegEx]
   ,Match$3:function(Self, s, idx$3, regularExpression$1, flags$1) {
      var Result = [];
      var re = null;
      re = TW3RegEx.Create$52($New(TW3RegEx),regularExpression$1,flags$1);
      Result = TW3RegEx.Match$1(re,s,idx$3);
      return Result
   }
   /// function TW3RegEx.Match(s: String; regularExpression: String; flags: String = '') : TStrArray
   ///  [line: 130, column: 25, file: SmartCL.RegEx]
   ,Match$2:function(Self, s$1, regularExpression$2, flags$2) {
      var Result = [];
      var re$1 = null;
      re$1 = TW3RegEx.Create$52($New(TW3RegEx),regularExpression$2,flags$2);
      Result = TW3RegEx.Match(re$1,s$1);
      return Result
   }
   /// function TW3RegEx.Match(s: String; var idx: Integer) : TStrArray
   ///  [line: 116, column: 19, file: SmartCL.RegEx]
   ,Match$1:function(Self, s$2, idx$4) {
      var Result = [];
      var jIdx = undefined;
      
    Result = (s$2).match(Self.FRegEx);
    if (Result!==null) jIdx = (Result).index;
    if (Result===null) Result = [];
  if (jIdx==null) {
         idx$4.v = -1;
      } else {
         idx$4.v = parseInt(jIdx,10);
      }
      return Result
   }
   /// function TW3RegEx.Match(s: String) : TStrArray
   ///  [line: 107, column: 19, file: SmartCL.RegEx]
   ,Match:function(Self, s$3) {
      var Result = [];
      
    Result = (s$3).match(Self.FRegEx);
    if (Result===null) Result=[];
  return Result
   }
   /// function TW3RegEx.Replace(s: String; replace: String; regularExpression: String; flags: String = '') : String
   ///  [line: 154, column: 25, file: SmartCL.RegEx]
   ,Replace$1:function(Self, s$4, replace$6, regularExpression$3, flags$3) {
      var Result = "";
      var re$2 = null;
      re$2 = TW3RegEx.Create$52($New(TW3RegEx),regularExpression$3,flags$3);
      Result = TW3RegEx.Replace(re$2,s$4,replace$6);
      return Result
   }
   /// function TW3RegEx.Replace(s: String; replace: String) : String
   ///  [line: 147, column: 19, file: SmartCL.RegEx]
   ,Replace:function(Self, s$5, replace$7) {
      var Result = "";
      
    Result = (s$5).replace(Self.FRegEx, replace$7);
  return Result
   }
   /// function TW3RegEx.Search(s: String; regularExpression: String; flags: String = '') : Integer
   ///  [line: 169, column: 25, file: SmartCL.RegEx]
   ,Search$1:function(Self, s$6, regularExpression$4, flags$4) {
      var Result = 0;
      var re$3 = null;
      re$3 = TW3RegEx.Create$52($New(TW3RegEx),regularExpression$4,flags$4);
      Result = TW3RegEx.Search(re$3,s$6);
      return Result
   }
   /// function TW3RegEx.Search(s: String) : Integer
   ///  [line: 162, column: 19, file: SmartCL.RegEx]
   ,Search:function(Self, s$7) {
      var Result = 0;
      
    Result = (s$7).search(Self.FRegEx);
  return Result
   }
   /// function TW3RegEx.Split(s: String; limit: Integer; regularExpression: String; flags: String = '') : TStrArray
   ///  [line: 199, column: 25, file: SmartCL.RegEx]
   ,Split$3:function(Self, s$8, limit, regularExpression$5, flags$5) {
      var Result = [];
      var re$4 = null;
      re$4 = TW3RegEx.Create$52($New(TW3RegEx),regularExpression$5,flags$5);
      Result = TW3RegEx.Split$1(re$4,s$8,limit);
      return Result
   }
   /// function TW3RegEx.Split(s: String; regularExpression: String; flags: String = '') : TStrArray
   ///  [line: 191, column: 25, file: SmartCL.RegEx]
   ,Split$2:function(Self, s$9, regularExpression$6, flags$6) {
      var Result = [];
      var re$5 = null;
      re$5 = TW3RegEx.Create$52($New(TW3RegEx),regularExpression$6,flags$6);
      Result = TW3RegEx.Split(re$5,s$9);
      return Result
   }
   /// function TW3RegEx.Split(s: String; limit: Integer) : TStrArray
   ///  [line: 184, column: 19, file: SmartCL.RegEx]
   ,Split$1:function(Self, s$10, limit$1) {
      var Result = [];
      
    Result = (s$10).split(Self.FRegEx, limit$1);
  return Result
   }
   /// function TW3RegEx.Split(s: String) : TStrArray
   ///  [line: 177, column: 19, file: SmartCL.RegEx]
   ,Split:function(Self, s$11) {
      var Result = [];
      
    Result = (s$11).split(Self.FRegEx);
  return Result
   }
   /// function TW3RegEx.Test(s: String; regularExpression: String; flags: String = '') : Boolean
   ///  [line: 213, column: 25, file: SmartCL.RegEx]
   ,Test$1:function(Self, s$12, regularExpression$7, flags$7) {
      var Result = false;
      var re$6 = null;
      re$6 = TW3RegEx.Create$52($New(TW3RegEx),regularExpression$7,flags$7);
      Result = TW3RegEx.Test(re$6,s$12);
      return Result
   }
   /// function TW3RegEx.Test(s: String) : Boolean
   ///  [line: 208, column: 19, file: SmartCL.RegEx]
   ,Test:function(Self, s$13) {
      return Self.FRegEx.test(s$13);
   }
   ,Destroy:TObject.Destroy
};
var a$29 = null;
var vColorNames = [];
var vColorNames = ["aqua", "black", "blue", "fuchsia", "green", "gray", "lime", "maroon", "navy", "olive", "purple", "red", "silver", "teal", "white", "yellow"].slice();
var vColorValues = [];
var vColorValues = ["#0ff", "#000", "#00f", "#f0f", "#008000", "#808080", "#0f0", "#800000", "#000080", "#808000", "#800080", "#f00", "#c0c0c0", "#008080", "#fff", "#ff00"].slice();
var vCurrent = null;
var vScheduledControls = [];
var vScheduledCallbacks = [];
var vOnPerform = [];
var vPending = false;
var RegisterComponentsProc = null;
var DefaultDuration = 2;
var DefaultTiming = 1;
var vGetNow = undefined;
var vIsHighResolution = false;
var PressedCSSClass = "TW3Button_Pressed";
var Instance = null;
var Application$1 = null;
var GForms = null;
var vCaptureControl = null;
var vCaptureInitialized = false;
var _FontDetect = null;
var vJSON_ID = 0;
var __CONV_BUFFER = null;
var __CONV_VIEW = null;
var __CONV_ARRAY = null;
var vUniqueNumber = 0;
var vVendor = 0;
var vDriver = null;
var vRequestAnimFrame = null;
var vCancelAnimFrame = null;
TApplicationFormsList.RegisterAutoCreate(Forms$2(),"Form1",true,true);
setupLUT();
TApplicationFormsList.RegisterForm(Forms$2(),"Form1",TForm1);
var $Application = function() {
   try {
      Application$1 = TW3CustomApplication.Create$17($New(TApplication));
      TW3CustomApplication.RunApp(Application$1);
   } catch ($e) {
      var e$15 = $W($e);
      alert(e$15.FMessage)   }
}
$Application();
var $Application = function() {
   if (_FontDetect) {
      TObject.Free(_FontDetect);
   }
}
$Application();


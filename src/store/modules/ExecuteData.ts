import { DefineGetters, DefineMutations, DefineActions, Dispatcher, Committer } from 'vuex-type-helper';
import * as ts from 'typescript';
import { languages } from '@/assets/ts/language-enums';
import { codeEdit } from '@/assets/ts/utils';

export interface ExecuteDataStates {
  code: string;
  input: string;
  output: string;
  error: string;
  lang: string;
  time: number;
}

export interface ExecuteDataGetters {
  getOutput: string;
  getTime: number;
  getInput: string;
  getError: string;
}

export interface ExecuteDataMutations {
  pushCode: {
    // mutationPayloadType
    code: string;
  };

  pushLanguage: {
    lang: string;
  };

  pushOutput: {
    out: string;
  };

  pushInput: {
    input: string;
  };

  pushTime: {
    time: number;
  };

  pushError: {
    error: string;
  };
}

export interface ExecuteDataActions {
  // DefineActions has {commit} as a first parameter
  submitCode: {
    code: string;
    lang: string;
  };

  submitInput: {
    input: string;
  }
}

const state: ExecuteDataStates = {
  // code
  code: '',
  // standard input
  input: '',
  // standard output
  output: '',
  // standard error
  error: '',
  // writing language
  lang: languages.JS_BROWSER,
  // execute time
  time: 0,
};

const getters: DefineGetters<ExecuteDataGetters, ExecuteDataStates> = {
  getOutput: (state) => { return state.output; },
  getTime: (state) => { return state.time; },
  getInput: (state) => { return state.input; },
  getError: (state) => { return state.error; },
};

// action 非同期 dispatcher
const actions: DefineActions<ExecuteDataActions, ExecuteDataStates, ExecuteDataMutations, ExecuteDataGetters> = {
  // payload = {code: string; lang: string;}
  submitCode({ commit }, payload) {
    /**** NOTE console.log is overrided, so use _original_console_log method instead of this. */
    const _original_console_log: (message?: any, ...optionalParams: any[]) => void = console.log;
    let out: string = '';
    let error: string = '';
    
    console.log = function() {
      const re = /%d|%s|%\.?[0-9]+d|%i|%\.?[0-9]+f/;
      let firstString: string = arguments[0];  
      let flag: boolean = true;
      for (let i = 1; i < arguments.length; i++) {
        _original_console_log(arguments[i]);
        if (firstString.search(re) > -1) {
          firstString = firstString.replace(re, arguments[i]);
        } else {
          if (flag) {
            out += '\n';
            flag = false;
          }
          out += String(arguments[i]) + ' ';
          out += '\n';
        }
      }
      // _original_console_log(firstString);
      if (flag) out += firstString + '\n';
    }

    commit('pushCode', payload);
    commit('pushLanguage', payload);
    // non-null
    let result: string = '';
    let value: string = '';
    switch (state.lang) {
      case languages.TS_BROWSER: 
        /**** TODO: make user select transpile version */ 
        value = `let inputinputinput: string = '${state.input}';\n`;
        result = (value + state.code).replace("require('fs').readFileSync('/dev/stdin', 'utf8')", 'inputinputinput');
        result = ts.transpile(result); // version 3.3333
        break;
      case languages.JS_BROWSER:
        // doesn't need transpile (not but this is not node.js)
        value = `let inputinputinput = '${state.input}';\n`;
        result = (value + state.code).replace("require('fs').readFileSync('/dev/stdin', 'utf8')", 'inputinputinput');
        break;
      // Now, do nothing default block.
    }
    let result_time: number = 0;
    try {
      // create function
      const func = new Function(result);
      // start measure time
      const start_ms: number = new Date().getTime();
      // execute
      func();
      const elapsed_ms: number = new Date().getTime() - start_ms;
      // measure time
      result_time = (elapsed_ms === 0) ? 1 : elapsed_ms;
    } catch (e) {
      // _original_console_log(e);
      error = e;
    }
    commit('pushError', { 'error': error });
    commit('pushOutput', { 'out': out } );
    commit('pushTime', { 'time': result_time });
  },

  // payload = {input: string;}
  submitInput({ commit }, payload) {
    commit('pushInput', payload);
  }
};

// stateの変更
const mutations: DefineMutations<ExecuteDataMutations, ExecuteDataStates> = {
  // payload = {code: string}
  pushCode(state, { code }) {
    // console.log(code);
    state.code = code;
  },

  pushLanguage(state, { lang }) {
    state.lang = languages[lang];
  },

  pushOutput(state, { out }) {
    state.output = out;
  },

  pushInput(state, { input }) {
    state.input = input;
  },

  pushTime(state, { time }) {
    state.time = time;
  },

  pushError(state, { error }) {
    state.error = error;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

/*
function Main(input){
	'use strict'
	const S = [...input.trim()];
	let c0=0;
	let c1=0;

	S.forEach((v)=>{
		if(v=="0") c0++;
		else c1++;
	});
	console.log(Math.min(c0,c1)*2);

}
Main(require('fs').readFileSync('/dev/stdin', 'utf8'));

*/
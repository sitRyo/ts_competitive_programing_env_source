import { DefineGetters, DefineMutations, DefineActions, Dispatcher, Committer } from 'vuex-type-helper';
import * as ts from 'typescript';
import { languages } from '@/assets/ts/language-enums';
import { constants } from '@/assets/ts/constants';

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
    /**** NOTE overrided console.log, so use _original_console_log method instead of that. */
    const _original_console_log: (message?: any, ...optionalParams: any[]) => void = console.log;
    const _original_console_error: (message?: any, ...optionalParams: any[]) => void = console.error;
    let out: string = '';
    let error: string = '';
    
    console.log = function() {
      for (let i = 0; i < arguments.length; i++) {
        // _original_console_log(out)
        out += String(arguments[i]) + ' '
      }
      out += '\n'
    }

    commit('pushCode', payload);
    commit('pushLanguage', payload);
    // non-null
    let result: string = state.code;
    switch (state.lang) {
      case languages.TS_BROWSER: 
        result = ts.transpile(state.code);
        break;
      default: 
        // doesn't need transpile
        ;
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
    _original_console_log(state.error);
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

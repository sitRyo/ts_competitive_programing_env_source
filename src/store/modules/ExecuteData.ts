import { DefineGetters, DefineMutations, DefineActions, Dispatcher, Committer } from 'vuex-type-helper';
import * as ts from 'typescript';
import { languages } from '@/assets/ts/language-enums';

export interface ExecuteDataStates {
  code: string;
  input: string;
  output: string;
  error: string;
  lang: string;
}

export interface ExecuteDataGetters {
  getOutput: string;
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
  }
}

export interface ExecuteDataActions {
  // DefineActions has {commit} as a first parameter
  submitCode: {
    code: string;
    lang: string;
  };
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
};

const getters: DefineGetters<ExecuteDataGetters, ExecuteDataStates> = {
  getOutput: (state) => { return state.output; },
};

// action 非同期 dispatcher
const actions: DefineActions<ExecuteDataActions, ExecuteDataStates, ExecuteDataMutations, ExecuteDataGetters> = {
  // payload = {code: string; lang: string}
  submitCode({commit}, payload) {
    const _original_console_log: (message?: any, ...optionalParams: any[]) => void = console.log;
    let out: string = '';

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
    
    // create function
    const func = new Function(result);
    // execute
    func();

    commit('pushOutput', { 'out': out } );
    _original_console_log("console -> "+ state.output);
  },
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

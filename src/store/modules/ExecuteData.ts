import { DefineGetters, DefineMutations, DefineActions, Dispatcher, Committer } from 'vuex-type-helper';
import * as ts from 'typescript';
import { languages } from '@/assets/ts/language-enums';

export interface ExecuteDataStates {
  code: string;
  input: string;
  output: string;
  error: string;
  lang: number;
}

export interface ExecuteDataGetters {
  getOutput: string;
}

export interface ExecuteDataMutations {
  pushCode: {
    // mutationPayloadType
    code: string;
  };
}

export interface ExecuteDataActions {
  // DefineActions has {commit} as a first parameter
  submitCode: {
    code: string;
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
  getOutput: (state) => state.output,
};

// action 非同期 dispatcher
const actions: DefineActions<ExecuteDataActions, ExecuteDataStates, ExecuteDataMutations, ExecuteDataGetters> = {
  // payload = {code: string}
  submitCode({commit}, payload) {
    // non-null
    let result: string = state.code;
    commit('pushCode', payload);
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
  },
};

// stateの変更
const mutations: DefineMutations<ExecuteDataMutations, ExecuteDataStates> = {
  // payload = {code: string}
  pushCode(state, { code }) {
    console.log(code);
    state.code = code;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};

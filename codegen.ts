import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  generates: {
    './src/modules/user/generated-types/user-resolvers-types.ts': {
      schema: './src/modules/user/typedefs/user.graphql',
      config: {
        useIndexSignature: true,
        mappers: {
          User: '../../../types/models/userModel#UserWithRoles',
        },
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};
// const config: CodegenConfig = {
//   schema: './src/modules/**/typedefs/*.graphql',
//   generates: {
//     './src/modules/': {
//       config: {
//         mappers: {
//           //   User: './userModel#UserM',
//         },
//         inputMaybeValue: 'undefined | T',
//       },
//       preset: 'graphql-modules',
//       presetConfig: {
//         baseTypesPath: '../generated-types/graphql.ts',
//         filename: 'generated-types/module-types.ts',
//         // useGraphQLModules: false,
//       },
//       plugins: [
//         {
//           add: {
//             content: '/* eslint-disable */',
//           },
//         },
//         'typescript',
//         'typescript-resolvers',
//       ],
//     },
//   },
// };
export default config;

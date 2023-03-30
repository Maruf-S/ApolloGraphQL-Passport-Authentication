import { GraphQLResolveInfo } from 'graphql';
const getSelections = (info: GraphQLResolveInfo) => {
  // tslint:disable-next-line:no-null-keyword
  return info.fieldNodes[0].selectionSet?.selections || null;
};

export const extractSelection = (info: GraphQLResolveInfo) => {
  const selections = getSelections(info);
  if (!selections) return [];
  return selections.reduce<string[]>((initalValue, selection) => {
    if (selection.kind == 'Field') {
      return [...initalValue, selection.name.value];
    }
    return initalValue;
  }, []);
};

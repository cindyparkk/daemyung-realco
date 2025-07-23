import type { StructureResolver } from "sanity/structure";

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  // S.list()
  //   .title("Projects")
  //   .items([
  //     S.listItem()
  //       .title("Categories")
  //       .child(
  //         S.documentTypeList("projectCategory")
  //           .title("Project Categories")
  //           .child((categoryId) =>
  //             S.documentList()
  //               .title("Projects")
  //               .filter('_type == "project" && category._ref == $categoryId')
  //               .params({ categoryId })
  //           )
  //       ),
  //   ]);
  S.list().title("Content").items(S.documentTypeListItems());

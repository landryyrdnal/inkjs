import * as testsUtils from "../common";

describe("Content", () => {
  let story: any;
  beforeEach(() => {
    story = testsUtils.loadInkFile("tests", "inkjs");
    story.allowExternalFunctionFallbacks = true;
  });

  it("should read simple content", () => {
    story.ChoosePathString("content.simple");

    expect(story.Continue()).toEqual("Simple content inside a knot\n");
  });

  it("should read multiline content", () => {
    story.ChoosePathString("content.multiline");

    expect(story.Continue()).toEqual("First line\n");
    expect(story.canContinue).toBeTruthy();
    expect(story.Continue()).toEqual("Second line\n");
  });

  it("should print a variable", () => {
    story.ChoosePathString("content.variable_text");

    expect(story.Continue()).toEqual("variable text\n");
  });

  it("should print a truthy conditional text", () => {
    story.ChoosePathString("content.if_text_truthy");

    expect(story.Continue()).toEqual("I… I saw him. Only for a moment.\n");
  });

  it("should print a falsy conditional text", () => {
    story.ChoosePathString("content.if_text_falsy");
    expect(story.Continue()).toEqual("I…\n");
  });

  it("should handle an if/else text", () => {
    story.ChoosePathString("content.if_else_text");

    expect(story.Continue()).toEqual("I saw him. Only for a moment.\n");
    expect(story.Continue()).toEqual(
      "I missed him. Was he particularly evil?\n"
    );
  });
});

describe("Glue", () => {
  let story: any;
  beforeEach(() => {
    story = testsUtils.loadInkFile("tests", "inkjs");
    story.allowExternalFunctionFallbacks = true;
  });

  it("should glue lines together", () => {
    story.ChoosePathString("glue.simple");

    expect(story.Continue()).toEqual("Simple glue\n");
  });

  it("should glue diverts together", () => {
    story.ChoosePathString("glue.diverted_glue");

    expect(story.Continue()).toEqual("More glue\n");
  });
});

describe("Divert", () => {
  let story: any;
  beforeEach(() => {
    story = testsUtils.loadInkFile("tests", "inkjs");
    story.allowExternalFunctionFallbacks = true;
  });

  it("should divert to a knot", () => {
    story.ChoosePathString("divert.divert_knot");

    expect(story.Continue()).toEqual("Diverted to a knot\n");
  });

  it("should divert to a stitch", () => {
    story.ChoosePathString("divert.divert_stitch");

    expect(story.Continue()).toEqual("Diverted to a stitch\n");
  });

  it("should divert to an internal stitch", () => {
    story.ChoosePathString("divert.internal_stitch");

    expect(story.Continue()).toEqual("Diverted to internal stitch\n");
  });

  it("should divert with a variable", () => {
    story.ChoosePathString("divert.divert_var");

    expect(story.Continue()).toEqual("Diverted with a variable\n");
  });
});

describe("Game Queries", () => {
  let story: any;
  beforeEach(() => {
    story = testsUtils.loadInkFile("tests", "inkjs");
    story.allowExternalFunctionFallbacks = true;
  });

  it("should reuturn a choice count", () => {
    story.ChoosePathString("game_queries.choicecount");
    story.Continue();

    expect(story.currentChoices.length).toEqual(1);
    expect(story.currentChoices[0].text).toEqual("count 0");

    story.ChooseChoiceIndex(0);
    story.Continue();

    expect(story.currentChoices.length).toEqual(2);
    expect(story.currentChoices[1].text).toEqual("count 1");

    story.ChooseChoiceIndex(0);
    story.Continue();

    expect(story.currentChoices.length).toEqual(3);
    expect(story.currentChoices[2].text).toEqual("count 2");

    story.ChooseChoiceIndex(0);
    story.Continue();

    expect(story.currentChoices.length).toEqual(4);
    expect(story.currentChoices[1].text).toEqual("count 1");
    expect(story.currentChoices[3].text).toEqual("count 3");
  });

  it("should return a turn since count", () => {
    story.ChoosePathString("game_queries.turnssince_before");
    expect(story.Continue()).toEqual("-1\n");
    expect(story.Continue()).toEqual("0\n");

    expect(story.currentChoices.length).toEqual(1);
    story.ChooseChoiceIndex(0);
    expect(story.Continue()).toEqual("1\n");

    expect(story.currentChoices.length).toEqual(1);
    story.ChooseChoiceIndex(0);
    expect(story.Continue()).toEqual("2\n");
  });
});

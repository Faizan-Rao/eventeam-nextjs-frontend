import i18n from './i18n'

export const joditConfig = {
    // direction: i18n.dir(),
    language: i18n.language,
    i18n,
    hidePoweredByJodit: true,
    readonly: false, // Set to true to make editor read-only
    useSplitMode: false,
    disablePlugins: [
      "code",
      "source",
      "print",
      "about",
      "dots",
      "video",
      "file",
      "break",
      "symbols",
      "table",
      "voice",
      "format",
      "superscript",
      "subscript",
      "classSpan",
      "speechRecognize",
      "copyformat",
      "ai-commands",
      "ai-assistant",
    ],
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    uploader: {
      insertImageAsBase64URI: true,
      imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
    },
  };
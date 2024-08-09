import { useState, useEffect, useRef } from 'react'

import { CKEditor } from '@ckeditor/ckeditor5-react'

import {
  DecoupledEditor,
  Plugin,
  ButtonView,
  AccessibilityHelp,
  Alignment,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  BlockToolbar,
  Bold,
  CKBox,
  CKBoxImageEdit,
  CloudServices,
  Code,
  Essentials,
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  GeneralHtmlSupport,
  Heading,
  Highlight,
  HorizontalLine,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Mention,
  PageBreak,
  Paragraph,
  PasteFromOffice,
  PictureEditing,
  RemoveFormat,
  SelectAll,
  ShowBlocks,
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  Style,
  Subscript,
  Superscript,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextPartLanguage,
  TextTransformation,
  Title,
  TodoList,
  Underline,
  Undo
} from 'ckeditor5'
import {
  Comments,
  ExportPdf,
  ExportWord,
  ImportWord,
  MultiLevelList,
  PresenceList,
  RealTimeCollaborativeComments,
  RealTimeCollaborativeEditing,
  RealTimeCollaborativeRevisionHistory,
  RealTimeCollaborativeTrackChanges,
  RevisionHistory,
  TrackChanges,
  TrackChangesData
} from 'ckeditor5-premium-features'

import translations from 'ckeditor5/translations/es.js'
import premiumFeaturesTranslations from 'ckeditor5-premium-features/translations/es.js'

import 'ckeditor5/ckeditor5.css'
import 'ckeditor5-premium-features/ckeditor5-premium-features.css'

import './ckeditor5.css'

import { editarDocumentoPorId } from '@/Service/axios.services'

const LICENSE_KEY =
  'ZW9wS2hzUmQwV09FcHJJY3pnVWFUOGhENjY4SkpNRXJNaXBlUHhRcGhILyt2L2F2ZDNVYWxGNkhNbnlaNkE9PS1NakF5TkRBNE1qVT0='

const CKBOX_TOKEN_URL = 'https://114666.cke-cs.com/token/dev/ZNcm34IqxLhLJJbjtPlQR4K4TKxYmu3KMO9m?limit=10'
const UNIQUE_CHANNEL_PER_DOCUMENT = '23'
const CLOUD_SERVICES_TOKEN_URL = 'https://114666.cke-cs.com/token/dev/ZNcm34IqxLhLJJbjtPlQR4K4TKxYmu3KMO9m?limit=10'
const CLOUD_SERVICES_WEBSOCKET_URL = 'wss://114666.cke-cs.com/ws'

class AnnotationsSidebarToggler extends Plugin {
  static get requires() {
    return ['AnnotationsUIs']
  }

  static get pluginName() {
    return 'AnnotationsSidebarToggler'
  }

  init() {
    this.toggleButton = new ButtonView(this.editor.locale)

    const NON_COLLAPSE_ANNOTATION_ICON =
      '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" transform="matrix(-1,0,0,1,0,0)"><path d="M11.463 5.187a.888.888 0 1 1 1.254 1.255L9.16 10l3.557 3.557a.888.888 0 1 1-1.254 1.255L7.26 10.61a.888.888 0 0 1 .16-1.382l4.043-4.042z"></path></svg>'

    const COLLAPSE_ANNOTATION_ICON =
      '<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" transform="matrix(1,0,0,1,0,0)"><path d="M11.463 5.187a.888.888 0 1 1 1.254 1.255L9.16 10l3.557 3.557a.888.888 0 1 1-1.254 1.255L7.26 10.61a.888.888 0 0 1 .16-1.382l4.043-4.042z"/></svg>'

    const annotationsUIsPlugin = this.editor.plugins.get('AnnotationsUIs')
    const annotationsContainer = this.editor.config.get('sidebar.container')
    const sidebarContainer = annotationsContainer.parentElement

    this.toggleButton.set({
      label: 'Toggle annotations sidebar',
      tooltip: 'Hide annotations sidebar',
      tooltipPosition: 'se',
      icon: COLLAPSE_ANNOTATION_ICON
    })

    this.toggleButton.on('execute', () => {
      // Toggle a CSS class on the annotations sidebar container to manage the visibility of the sidebar.
      annotationsContainer.classList.toggle('ck-hidden')

      // Change the look of the button to reflect the state of the annotations container.
      if (annotationsContainer.classList.contains('ck-hidden')) {
        this.toggleButton.icon = NON_COLLAPSE_ANNOTATION_ICON
        this.toggleButton.tooltip = 'Show annotations sidebar'
        annotationsUIsPlugin.switchTo('inline')
      } else {
        this.toggleButton.icon = COLLAPSE_ANNOTATION_ICON
        this.toggleButton.tooltip = 'Hide annotations sidebar'
        annotationsUIsPlugin.switchTo('wideSidebar')
      }

      // Keep the focus in the editor whenever the button is clicked.
      this.editor.editing.view.focus()
    })

    this.toggleButton.render()

    sidebarContainer.insertBefore(this.toggleButton.element, annotationsContainer)
  }

  destroy() {
    this.toggleButton.element.remove()

    return super.destroy()
  }
}

export default function CustomEditor({ idDoc }) {
  const editorPresenceRef = useRef(null)
  const editorContainerRef = useRef(null)
  const editorMenuBarRef = useRef(null)
  const editorToolbarRef = useRef(null)
  const editorRef = useRef(null)
  const editorAnnotationsRef = useRef(null)
  const editorRevisionHistoryRef = useRef(null)
  const editorRevisionHistoryEditorRef = useRef(null)
  const editorRevisionHistorySidebarRef = useRef(null)
  const [isLayoutReady, setIsLayoutReady] = useState(false)
  const [documentContent, setDocumentContent] = useState('');

  console.log('idDoc: ', idDoc)

  useEffect(() => {
    setIsLayoutReady(true);
    
    // Fetch document content by ID
    const fetchDocument = async () => {
      try {
        const response = await editarDocumentoPorId(idDoc);
        setDocumentContent(response.data.contenido || '<h2> </h2>'); // Ajusta según la estructura de tu respuesta
      } catch (error) {
        console.error('Error al obtener el documento:', error);
      }
    };

    fetchDocument();

    return () => setIsLayoutReady(false);
    // Fetch document content by ID
    // const fetchDocument = async () => {
    //   try {
    //     const response = await editarDocumentoPorId(documentId);
    //     setDocumentContent(response.data.contenido); // Asume que el contenido del documento está en 'contenido'
    //   } catch (error) {
    //     console.error('Error al obtener el documento:', error);
    //   }
    // };

    // fetchDocument();

    // return () => setIsLayoutReady(false);
  }, [idDoc]);

  const handleSave = async (data) => {
    try {
      await editarDocumentoPorId(idDoc, { contenido: data });
      console.log('Documento guardado con éxito');
    } catch (error) {
      console.error('Error al guardar el documento:', error);
    }
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setDocumentContent(data);
    handleSave(data);
  };

  const editorConfig = {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'revisionHistory',
        'trackChanges',
        'comment',
        '|',
        'showBlocks',
        '|',
        'heading',
        'style',
        '|',
        'fontSize',
        'fontFamily',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        '|',
        'link',
        'insertImage',
        'insertTable',
        'highlight',
        'blockQuote',
        '|',
        'alignment',
        '|',
        'bulletedList',
        'numberedList',
        'multiLevelList',
        'todoList',
        'outdent',
        'indent'
      ],
      shouldNotGroupWhenFull: false
    },
    plugins: [
      AccessibilityHelp,
      Alignment,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      BalloonToolbar,
      BlockQuote,
      BlockToolbar,
      Bold,
      CKBox,
      CKBoxImageEdit,
      CloudServices,
      Code,
      Comments,
      Essentials,
      ExportPdf,
      ExportWord,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      GeneralHtmlSupport,
      Heading,
      Highlight,
      HorizontalLine,
      HtmlEmbed,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      ImportWord,
      Indent,
      IndentBlock,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Mention,
      MultiLevelList,
      PageBreak,
      Paragraph,
      PasteFromOffice,
      PictureEditing,
      PresenceList,
      RealTimeCollaborativeComments,
      RealTimeCollaborativeEditing,
      RealTimeCollaborativeRevisionHistory,
      RealTimeCollaborativeTrackChanges,
      RemoveFormat,
      RevisionHistory,
      SelectAll,
      ShowBlocks,
      SpecialCharacters,
      SpecialCharactersArrows,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Style,
      Subscript,
      Superscript,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextPartLanguage,
      TextTransformation,
      Title,
      TodoList,
      TrackChanges,
      TrackChangesData,
      Underline,
      Undo
    ],
    extraPlugins: [AnnotationsSidebarToggler],
    balloonToolbar: ['comment', '|', 'bold', 'italic', '|', 'link', 'insertImage', '|', 'bulletedList', 'numberedList'],
    blockToolbar: [
      'comment',
      '|',
      'fontSize',
      'fontColor',
      'fontBackgroundColor',
      '|',
      'bold',
      'italic',
      '|',
      'link',
      'insertImage',
      'insertTable',
      '|',
      'bulletedList',
      'numberedList',
      'outdent',
      'indent'
    ],
    ckbox: {
      tokenUrl: CKBOX_TOKEN_URL
    },
    cloudServices: {
      tokenUrl: CLOUD_SERVICES_TOKEN_URL,
      webSocketUrl: CLOUD_SERVICES_WEBSOCKET_URL
    },
    collaboration: {
      channelId: `document-${idDoc}`
    },
    comments: {
      editorConfig: {
        extraPlugins: [Autoformat, Bold, Italic, List, Mention],
        mention: {
          feeds: [
            {
              marker: '@',
              feed: [
                /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html#comments-with-mentions */
              ]
            }
          ]
        }
      }
    },
    exportPdf: {
      stylesheets: [
        /* This path should point to application stylesheets. */
        /* See: https://ckeditor.com/docs/ckeditor5/latest/features/converters/export-pdf.html */
        './ckeditor5.css',

        /* Export PDF needs access to stylesheets that style the content. */
        'https://cdn.ckeditor.com/ckeditor5/42.0.2/ckeditor5.css',
        'https://cdn.ckeditor.com/ckeditor5-premium-features/42.0.2/ckeditor5-premium-features.css'
      ],
      fileName: 'export-pdf-demo.pdf',
      converterOptions: {
        format: 'A4',
        margin_top: '20mm',
        margin_bottom: '20mm',
        margin_right: '12mm',
        margin_left: '12mm',
        page_orientation: 'portrait'
      }
    },
    exportWord: {
      stylesheets: [
        /* This path should point to application stylesheets. */
        /* See: https://ckeditor.com/docs/ckeditor5/latest/features/converters/export-word.html */
        './ckeditor5.css',

        /* Export Word needs access to stylesheets that style the content. */
        'https://cdn.ckeditor.com/ckeditor5/42.0.2/ckeditor5.css',
        'https://cdn.ckeditor.com/ckeditor5-premium-features/42.0.2/ckeditor5-premium-features.css'
      ],
      fileName: 'export-word-demo.docx',
      converterOptions: {
        format: 'A4',
        margin_top: '20mm',
        margin_bottom: '20mm',
        margin_right: '12mm',
        margin_left: '12mm',
        orientation: 'portrait'
      }
    },
    fontFamily: {
      supportAllValues: true
    },
    fontSize: {
      options: [10, 12, 14, 'default', 18, 20, 22],
      supportAllValues: true
    },
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph'
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1'
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2'
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3'
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4'
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5'
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6'
        }
      ]
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true
        }
      ]
    },
    image: {
      toolbar: [
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        '|',
        'resizeImage',
        '|',
        'ckboxImageEdit'
      ]
    },
    initialData: documentContent,
    language: 'es',
    licenseKey: LICENSE_KEY,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file'
          }
        }
      }
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true
      }
    },
    mention: {
      feeds: [
        {
          marker: '@',
          feed: [
            /* See: https://ckeditor.com/docs/ckeditor5/latest/features/mentions.html */
          ]
        }
      ]
    },
    menuBar: {
      isVisible: true
    },
    placeholder: '¡Escribe o pega tu contenido aquí!',
    presenceList: {
      container: editorPresenceRef.current
    },
    revisionHistory: {
      editorContainer: editorContainerRef.current,
      viewerContainer: editorRevisionHistoryRef.current,
      viewerEditorElement: editorRevisionHistoryEditorRef.current,
      viewerSidebarContainer: editorRevisionHistorySidebarRef.current,
      resumeUnsavedRevision: true
    },
    sidebar: {
      container: editorAnnotationsRef.current
    },
    style: {
      definitions: [
        {
          name: 'Article category',
          element: 'h3',
          classes: ['category']
        },
        {
          name: 'Title',
          element: 'h2',
          classes: ['document-title']
        },
        {
          name: 'Subtitle',
          element: 'h3',
          classes: ['document-subtitle']
        },
        {
          name: 'Info box',
          element: 'p',
          classes: ['info-box']
        },
        {
          name: 'Side quote',
          element: 'blockquote',
          classes: ['side-quote']
        },
        {
          name: 'Marker',
          element: 'span',
          classes: ['marker']
        },
        {
          name: 'Spoiler',
          element: 'span',
          classes: ['spoiler']
        },
        {
          name: 'Code (dark)',
          element: 'pre',
          classes: ['fancy-code', 'fancy-code-dark']
        },
        {
          name: 'Code (bright)',
          element: 'pre',
          classes: ['fancy-code', 'fancy-code-bright']
        }
      ]
    },
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
    },
    translations: [translations, premiumFeaturesTranslations]
  }

  configUpdateAlert(editorConfig)

  return (
    <div>
      <div className='main-container'>
        <div className='presence' ref={editorPresenceRef}></div>
        <div
          className='editor-container editor-container_document-editor editor-container_include-annotations editor-container_include-style'
          ref={editorContainerRef}
        >
          <div className='editor-container__menu-bar' ref={editorMenuBarRef}></div>
          <div className='editor-container__toolbar' ref={editorToolbarRef}></div>
          <div className='editor-container__editor-wrapper'>
            <div className='editor-container__editor'>
              <div ref={editorRef}>
                {isLayoutReady && (
                  <CKEditor
                    onReady={editor => {
                      editorToolbarRef.current.appendChild(editor.ui.view.toolbar.element)
                      editorMenuBarRef.current.appendChild(editor.ui.view.menuBarView.element)
                    }}
                    onAfterDestroy={() => {
                      Array.from(editorToolbarRef.current.children).forEach(child => child.remove())
                      Array.from(editorMenuBarRef.current.children).forEach(child => child.remove())
                    }}
                    editor={DecoupledEditor}
                    config={editorConfig}
                    data={documentContent}
                    onChange={handleEditorChange}
                  />
                )}
              </div>
            </div>
            <div className='editor-container__sidebar'>
              <div ref={editorAnnotationsRef}></div>
            </div>
          </div>
        </div>
        <div className='revision-history' ref={editorRevisionHistoryRef}>
          <div className='revision-history__wrapper'>
            <div className='revision-history__editor' ref={editorRevisionHistoryEditorRef}></div>
            <div className='revision-history__sidebar' ref={editorRevisionHistorySidebarRef}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

function configUpdateAlert(config) {
  if (configUpdateAlert.configUpdateAlertShown) {
    return
  }

  const isModifiedByUser = (currentValue, forbiddenValue) => {
    if (currentValue === forbiddenValue) {
      return false
    }

    if (currentValue === undefined) {
      return false
    }

    return true
  }

  const valuesToUpdate = []

  configUpdateAlert.configUpdateAlertShown = true

  if (!isModifiedByUser(config.licenseKey, '<YOUR_LICENSE_KEY>')) {
    valuesToUpdate.push('LICENSE_KEY')
  }

  if (!isModifiedByUser(config.ckbox?.tokenUrl, '<YOUR_CKBOX_TOKEN_URL>')) {
    valuesToUpdate.push('CKBOX_TOKEN_URL')
  }

  if (!isModifiedByUser(config.collaboration?.channelId, '<YOUR_UNIQUE_CHANNEL_PER_DOCUMENT>')) {
    valuesToUpdate.push('UNIQUE_CHANNEL_PER_DOCUMENT')
  }

  if (!isModifiedByUser(config.cloudServices?.tokenUrl, '<YOUR_CLOUD_SERVICES_TOKEN_URL>')) {
    valuesToUpdate.push('CLOUD_SERVICES_TOKEN_URL')
  }

  if (!isModifiedByUser(config.cloudServices?.webSocketUrl, '<YOUR_CLOUD_SERVICES_WEBSOCKET_URL>')) {
    valuesToUpdate.push('CLOUD_SERVICES_WEBSOCKET_URL')
  }

  if (valuesToUpdate.length) {
    window.alert(
      [
        'Please update the following values in your editor config',
        'in order to receive full access to the Premium Features:',
        '',
        ...valuesToUpdate.map(value => ` - ${value}`)
      ].join('\n')
    )
  }
}

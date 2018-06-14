import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewEncapsulation, OnInit
} from '@angular/core';
import {
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS,
    ControlValueAccessor,
    FormControl,
    Validator
} from '@angular/forms';

import * as Quill from 'quill';

@Component({
    selector: 'editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => EditorComponent),
        multi: true
    }, {
        provide: NG_VALIDATORS,
        useExisting: forwardRef(() => EditorComponent),
        multi: true
    }],
    encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements AfterViewInit, ControlValueAccessor, OnChanges, Validator {
    quillEditor: any;
    editorElem: HTMLElement;
    emptyArray: any[] = [];
    content: any;
    defaultModules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{'header': 1}, {'header': 2}],               // custom button values
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
            [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
            [{'direction': 'rtl'}],                         // text direction

            [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
            [{'header': [1, 2, 3, 4, 5, 6, false]}],

            [{'color': this.emptyArray.slice()}, {'background': this.emptyArray.slice()}],          // dropdown with defaults from theme
            [{'font': this.emptyArray.slice()}],
            [{'align': this.emptyArray.slice()}],

            ['clean'],                                         // remove formatting button

            ['link', 'image', 'video']                         // link and image, video
        ]
    };

    @Input() theme: string;
    @Input() modules: Object;
    @Input() readOnly: boolean;
    @Input() placeholder: string;
    @Input() maxLength: number;
    @Input() minLength: number;
    @Input() formats: string[];

    @Output() onEditorCreated: EventEmitter<any> = new EventEmitter();
    @Output() onContentChanged: EventEmitter<any> = new EventEmitter();
    @Output() onSelectionChanged: EventEmitter<any> = new EventEmitter();

    onModelChange: Function = () => {
    };
    onModelTouched: Function = () => {
    };

    constructor(private elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        const toolbarElem = this.elementRef.nativeElement.querySelector('[quill-editor-toolbar]');
        let modules = this.modules || this.defaultModules;

        if (toolbarElem) {
            modules['toolbar'] = toolbarElem;
        }
        this.elementRef.nativeElement.insertAdjacentHTML('beforeend', '<div quill-editor-element></div>');
        this.editorElem = this.elementRef.nativeElement.querySelector('[quill-editor-element]');

        this.quillEditor = new Quill(this.editorElem, {
            modules: modules,
            placeholder: this.placeholder || 'Insert text here ...',
            readOnly: this.readOnly || false,
            theme: this.theme || 'snow',
            formats: this.formats
        });

        this.onEditorCreated.emit(this.quillEditor);

        // mark model as touched if editor lost focus
        this.quillEditor.on('selection-change', (range: any, oldRange: any, source: string) => {
            this.onSelectionChanged.emit({
                editor: this.quillEditor,
                range: range,
                oldRange: oldRange,
                source: source
            });

            if (!range) {
                this.onModelTouched();
            }
        });

        // update model if text changes
        this.quillEditor.on('text-change', (delta: any, oldDelta: any, source: string) => {
            let html = this.editorElem.children[0].innerHTML;
            const text = this.quillEditor.getText();

            if (html === '<p><br></p>') {
                html = null;
            }

            this.onModelChange(html);

            this.onContentChanged.emit({
                editor: this.quillEditor,
                html: html,
                text: text,
                delta: delta,
                oldDelta: oldDelta,
                source: source
            });
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['readOnly'] && this.quillEditor) {
            this.quillEditor.enable(!changes['readOnly'].currentValue);
        }
    }

    writeValue(currentValue: any) {
        this.content = currentValue;

        if (this.quillEditor) {
            if (currentValue) {
                this.quillEditor.pasteHTML(currentValue);
                return;
            }
            this.quillEditor.setText('');
        }
    }

    registerOnChange(fn: Function): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onModelTouched = fn;
    }

    validate(c: FormControl) {
        if (!this.quillEditor) {
            return null;
        }

        let err: {
                minLengthError?: {given: number, minLength: number};
                maxLengthError?: {given: number, maxLength: number};
            } = {},
            valid = true;

        const textLength = this.quillEditor.getText().trim().length;

        if (this.minLength) {
            err.minLengthError = {
                given: textLength,
                minLength: this.minLength
            };

            valid = textLength >= this.minLength || !textLength;
        }

        if (this.maxLength) {
            err.maxLengthError = {
                given: textLength,
                maxLength: this.maxLength
            };

            valid = textLength <= this.maxLength && valid;
        }

        return valid ? null : err;
    }

}

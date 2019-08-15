import { PolymerElement,html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

import '@firefly-elements/polymerfire/firebase-query';
import {FireflyListMixin} from '@firefly-elements/firefly-list-mixin/firefly-list-mixin.js';
import '@aspen-elements/aspen-button/aspen-button.js';
import '@aspen-elements/aspen-security-mixin/aspen-security-mixin.js';
import {AspenSecurableMixin} from '@aspen-elements/aspen-securable-mixin/aspen-securable-mixin.js';


/**
 * `firefly-name-multiselect` This component is similar to the asp-name-fire-list but supports multiple selections.
 * It connects a user-definable firebase query and the user can add a detail-dialog to add new terms.
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {Polymer.Element}
 */
class FireflyNameMultiselect extends FireflyListMixin(AspenSecurableMixin(PolymerElement)) {
  static get template() {
    return html`
        <style>
            :host {
                display: block;
                --label-size: 0.9em;
                --label-color: var(--material-secondary-text-color);
                --selected-color: rgb(122, 122, 228);
            }

            .component{
                @apply --layout-vertical;
            }
            .header{
                @apply --layout-horizontal;
            }
            .label{
                font-size: var(--label-size);
                color: var(--label-color);
                height: fit-content;
                margin-right: 5px;
                margin-top: 3px;
            }
            paper-listbox{
                border-radius: 4px;
                background-color: var(--lumo-contrast-10pct);
            }

            paper-item.iron-selected{
                background-color: transparent;
                color: var(--selected-color);
            }
            

            paper-item.iron-selected > iron-icon{
                display: block;
                margin-right: 3px;
                color: var(--selected-color);
            }

            paper-item > iron-icon{
                display: none;
            }

        </style>

        <firebase-query app-name="[[appName]]" path="[[path]]" data="{{model}}" order-by-child="[[orderByChild]]"></firebase-query>

        <div class="component">

            <div class="header">
                <div class="label">[[label]]</div>
                <div>
                <template is="dom-if" if="[[hasRole]]">
                    <aspen-button icon="list:add-circle" on-tap="_openAddDialog"></aspen-button>
                </template>
                </div>
            </div>
    

            <paper-listbox multi="" selected-values="{{selectedValues}}" items="[[model]]" attr-for-selected="id">
                <template is="dom-repeat" items="[[model]]">
                    <paper-item id="[[item.name]]">
                        <iron-icon icon="list:check"></iron-icon>
                        [[item.name]]
                    </paper-item>
                </template>
            </paper-listbox>

        
            
        </div>

        <slot select=".detail-dialog"></slot>
`;
  }

  /**
   * String providing the tag name to register the element under.
   */
  static get is() {
      return 'firefly-name-multiselect';
  }

  /**
   * Object describing property-related metadata used by Polymer features
   */
  static get properties() {
      return {


          /** An array of selected values. */
          selectedValues:{
              type: Array,
              value: [],
              notify: true
          }
          
      };
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
      super();
  }

  /**
   * Use for one-time configuration of your component after local DOM is initialized. 
   */
  ready() {
      super.ready();
      if(this.selectedValues === undefined){
          this.selectedValues = [];
      }

      afterNextRender(this, function() {
          
      });
  }

  /**
    * Called every time the element is inserted into the DOM. Useful for 
    * running setup code, such as fetching resources or rendering.
    * Generally, you should try to delay work until this time.
    */
  connectedCallback() {
      super.connectedCallback();
  
       let listbox = this.shadowRoot.querySelector("paper-listbox");
       listbox.addEventListener("iron-activate", e => {
           if(this.selectedValues === undefined){
              this.set('selectedValues', []);
           }
           
       });

      
  
  }

  /**
    * Called every time the element is removed from the DOM. Useful for 
    * running clean up code (removing event listeners, etc.).
    */
  disconnectedCallback() {
      super.disconnectedCallback();
  
      
  
  }
}

window.customElements.define(FireflyNameMultiselect.is, FireflyNameMultiselect);

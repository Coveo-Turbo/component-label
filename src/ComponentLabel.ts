import { $$, Component, IComponentBindings, ComponentOptions, IQuerySuccessEventArgs, QueryEvents, INoResultsEventArgs, l } from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';

export interface IComponentLabelOptions {
    content: string;
    contentType: string;
    labelType: string;
    shouldBeLocalized: boolean;
}

@lazyComponent
export class ComponentLabel extends Component {
    static ID = 'ComponentLabel';
    static options: IComponentLabelOptions = {
        content: ComponentOptions.buildStringOption({ defaultValue: 'label' }),
        contentType: ComponentOptions.buildStringOption({ defaultValue: 'text' }),
        labelType: ComponentOptions.buildStringOption({ defaultValue: '' }),
        shouldBeLocalized: ComponentOptions.buildBooleanOption({ defaultValue: false }),
    };
    static contentTypeOptions = [
        'header',
        'text',
    ];

    constructor(public element: HTMLElement, public options: IComponentLabelOptions, public bindings: IComponentBindings) {
        super(element, ComponentLabel.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, ComponentLabel, options);

        this.bind.onRootElement(QueryEvents.querySuccess, (args: IQuerySuccessEventArgs) => this.handleQuerySuccess(args));
        this.bind.onRootElement(QueryEvents.queryError, () => this.handleQueryError());
        this.bind.onRootElement(QueryEvents.noResults, (args: INoResultsEventArgs) => this.handleNoResults());
    }


    private handleQueryError() {
        this.reset();
    }

    private handleNoResults() {
        this.reset();
    }

    private handleQuerySuccess(data: IQuerySuccessEventArgs) {
        const { labelType } = this.options;
        const { results, totalCountFiltered } = data.results;
        let hasData = results.length != 0;
        this.reset();
        switch (labelType) {
            case 'pager':
                const { numberOfResults } = data.queryBuilder;
                const filteredMoreThanTotal = totalCountFiltered > numberOfResults;
                if (hasData && filteredMoreThanTotal) {
                    this.build();
                }
                break;
            case 'breadcrumb':
                const { facets } = data.results;
                let hasSelected = false;
                for (let i = 0; i < facets.length; i++) {
                    let values = facets[i].values;
                    for (let j = 0; j < values.length; j++) {
                        if (values[j].state.toString() == "selected") {
                            hasSelected = true;
                            break;
                        }
                    }
                    if (hasSelected) {
                        this.build();
                        break;
                    }
                }
                break;
            default:
                this.build();
        }
    }

    private reset() {
        $$(this.element).empty();
    }

    protected build() {
        this.renderComponentLabel();
    }

    protected renderComponentLabel() {
        const { content, contentType, shouldBeLocalized } = this.options;
        const localizedContent = shouldBeLocalized ? l(content) : content;
        const classes = ComponentLabel.contentTypeOptions.indexOf(contentType) > -1 ?
            `component-label ${contentType}` : 'component-label text';
        const componentLabelElement = $$('p', { className: classes, ariaHidden: 'false' }, localizedContent).el;
        $$(this.element).append(componentLabelElement);
    }
}
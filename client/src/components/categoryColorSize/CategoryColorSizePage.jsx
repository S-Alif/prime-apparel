import CategoryColorSizeForm from "./CategoryColorSizeForm"
import Section from "../tags/Section"
import CategoryColorSizeTable from "./CategoryColorSizeTable"


const CategoryColorSizePage = ({page = "category", data = []}) => {

    return (
        <section className="page-wrapper" id="category-page">

            {/* category form */}
            <Section id="category-form" title={page}>
                <div className="w-[500px] max-w-[calc(100%)] content-wrapper">
                    <CategoryColorSizeForm
                        generateForm={page}
                        updating={false}
                    />
                </div>
            </Section>

            {/* category list */}
            <Section id={`${page}-list`} title={`${page} list`}>
                <div className="min-h-[400px] content-wrapper">
                    {
                        data.length == 0 && <p className="text-xl font-bold text-gray-300">No data found</p>
                    }
                    {
                        data.length > 0 &&
                        <CategoryColorSizeTable 
                            page={page}
                            data={data}
                        />
                    }
                </div>
            </Section>
        </section>
    )
}

export default CategoryColorSizePage
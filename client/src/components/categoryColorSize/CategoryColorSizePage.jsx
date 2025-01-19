import CategoryColorSizeForm from "./CategoryColorSizeForm"
import Section from "../tags/Section"
import CategoryColorSizeTable from "./CategoryColorSizeTable"


const CategoryColorSizePage = ({page = "category", data = []}) => {

    return (
        <section className="w-full h-auto" id="category-page">

            {/* category form */}
            <Section id="category-form" title={page}>
                <div className="w-[500px] h-auto max-w-[calc(100%)] p-3 lg:p-10 rounded-lg bg-white shadow">
                    <CategoryColorSizeForm
                        generateForm={page}
                        updating={false}
                    />
                </div>
            </Section>

            {/* category list */}
            <Section id={`${page}-list`} title={`${page} list`}>
                <div className="bg-white rounded-lg p-3 lg:p-10 min-h-[400px] shadow">
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
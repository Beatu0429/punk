
export default function Options( { sortingOption, setSortingOption } ){
    return(
        <>
            <select value={sortingOption} onChange={(e) => setSortingOption(e.target.value)}>
                <option value="">Sort By</option>
                <option value="name">Name</option>
                <option value="first_brewed">First Brewed</option>
            </select>
        </>
    )
}
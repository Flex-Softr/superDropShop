import { Typography } from "@mui/material"

const FeaturedProdcutTitle = ({title}) =>{
return(
    <h3 className="font-sans font-normal normal-case text-sm    text-normal">{title.slice(0,32)}...</h3>
)
}

const CategoryTitles = ({title}) =>{
    return <h3 className="font-sans">{title}</h3>
}
const PriceTitles = ({title}) =>{
    return <h3 className="font-sans text-priceText font-semibold text-sm"> ৳ {title} </h3>
}

const FeatureProduct = ({title}) =>{
    return <h3 className="font-sans text-[24px] font-semibold">{title}</h3>
}

const AddToCardDetailsProductTitle = ({title}) =>{
    return <Typography variant="h5" component="h5">{title}</Typography>
}

const SkuTitle = ({title}) =>{
    return <Typography variant="p" component="p">{title}</Typography>
}

const BrandTitle = ({title}) =>{
    return <Typography variant="p" component="p">{title}</Typography>
}

const AvailabilityTitle = ({title}) =>{
    return <Typography variant="p" color="offBadge">{title}</Typography>
}

const CategoryTitle = ({title}) =>{
    return <Typography variant="p" component="p">{title}</Typography>
}

const ResellerPriceTitle = ({title}) =>{
    return  <p className='text-ratingIcon font-medium text-3xl'>Reseller Price <span>{title}</span> BDT</p>
}

export {
    FeaturedProdcutTitle,
    CategoryTitles,PriceTitles,
    FeatureProduct,
    AddToCardDetailsProductTitle,
    SkuTitle,
    BrandTitle,
    AvailabilityTitle,
    CategoryTitle,
    ResellerPriceTitle,
}
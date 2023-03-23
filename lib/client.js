import  sanityClient  from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url"

export const client = sanityClient({
    projectId:'lu0y6x97',
    dataset:'production',
    appVersion:'2022-03-22',
    useCdn:true,
    token:'skuU7ZTGqCAyU7y0wg067fSdKhvfAsRJKwaz8CexXC6Bo0esSBl7Bq4TGr0nsLWveOYw0M0stc9gWZDOPIUtCqq1hj67zC2AY3QHMNWA09gfBhJGF2AAqN6i49YGeMAUVloYG3cbyk5ml8DmX6RJkMl4oyQwJq8KMRaYibkbrisEg4Cmh6km'
})

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)
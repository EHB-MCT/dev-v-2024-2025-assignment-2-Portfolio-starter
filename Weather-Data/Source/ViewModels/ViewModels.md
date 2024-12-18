## ViewModels

Use ViewModels to keep the views lightweight and focused on rendering. They handle the transformation of data and the interactions made by users (ex: button clicked calls an API) and connect to services. Some ViewModels may be shared or abstract based and can be put in the Shared folder. Please be sure to put multiple ViewModels that are linked inside a subfolder EVEN if they are in the shared folder.

Make sur to import "Combine" and "Foundation".

Use upper CamelCase to name the files according to their use (name of the View they are linked to/ used for + "Model"). In case a contribution requires multiple ViewModels/ Views, put these in a subfolder named after the use case. Also, use upper CamelCase to name the folder.
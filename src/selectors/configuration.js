export const getSize = configuration => 
  ((configuration && configuration.images) ? configuration.images.backdrop_sizes[2] : null);

export const getBaseUrlImage = configuration => (configuration && configuration.images) ? configuration.images.secure_base_url : null;

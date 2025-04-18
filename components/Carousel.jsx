import React, { useState, useEffect } from 'react';
import { Box, Flex, IconButton, useBreakpointValue } from '@chakra-ui/react';

const Carousel = ({ items, autoPlay = true, interval = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(autoPlay);

  // Se não houver itens, não renderiza nada
  if (!items || items.length === 0) {
    return null;
  }

  // Controla o autoplay
  useEffect(() => {
    let timer;
    if (autoPlayEnabled) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % items.length);
      }, interval);
    }
    return () => clearInterval(timer);
  }, [autoPlayEnabled, items.length, interval]);

  // Pausa o autoplay quando o mouse está sobre o carrossel
  const handleMouseEnter = () => setAutoPlayEnabled(false);
  const handleMouseLeave = () => setAutoPlayEnabled(autoPlay);

  // Navegação para o slide anterior
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length);
  };

  // Navegação para o próximo slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % items.length);
  };

  // Navegação direta para um slide específico
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Ajusta a altura do carrossel com base no tamanho da tela
  const carouselHeight = useBreakpointValue({ base: '200px', md: '300px', lg: '400px' });

  return (
    <Box 
      position="relative" 
      height={carouselHeight} 
      overflow="hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      borderRadius="lg"
    >
      {/* Slides */}
      {items.map((item, index) => (
        <Box
          key={item.id || index}
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          opacity={index === currentSlide ? 1 : 0}
          transition="opacity 0.5s ease-in-out"
          zIndex={index === currentSlide ? 1 : 0}
          bg={item.image ? 'transparent' : 'brand.500'}
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
        >
          {item.image ? (
            <Box
              as="img"
              src={item.image}
              alt={item.alt || `Slide ${index + 1}`}
              width="100%"
              height="100%"
              objectFit="cover"
            />
          ) : (
            <Box textAlign="center" p={4}>
              {item.alt || `Slide ${index + 1}`}
            </Box>
          )}
          
          {/* Conteúdo do slide, se houver */}
          {item.content && (
            <Box
              position="absolute"
              bottom="0"
              left="0"
              width="100%"
              p={4}
              bg="rgba(0, 0, 0, 0.5)"
              color="white"
            >
              {item.content}
            </Box>
          )}
        </Box>
      ))}

      {/* Botões de navegação */}
      <Flex 
        position="absolute" 
        width="100%" 
        justify="space-between" 
        align="center"
        top="50%"
        transform="translateY(-50%)"
        px={4}
        zIndex={2}
      >
        <IconButton
          aria-label="Slide anterior"
          icon={<Box>←</Box>}
          onClick={prevSlide}
          variant="ghost"
          color="white"
          bg="rgba(0, 0, 0, 0.3)"
          _hover={{ bg: 'rgba(0, 0, 0, 0.5)' }}
          size="lg"
          borderRadius="full"
        />
        <IconButton
          aria-label="Próximo slide"
          icon={<Box>→</Box>}
          onClick={nextSlide}
          variant="ghost"
          color="white"
          bg="rgba(0, 0, 0, 0.3)"
          _hover={{ bg: 'rgba(0, 0, 0, 0.5)' }}
          size="lg"
          borderRadius="full"
        />
      </Flex>

      {/* Indicadores */}
      <Flex 
        position="absolute" 
        bottom="4" 
        width="100%" 
        justify="center" 
        zIndex={2}
      >
        {items.map((_, index) => (
          <Box
            key={index}
            as="button"
            width="10px"
            height="10px"
            borderRadius="full"
            bg={index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.5)'}
            mx={1}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </Flex>
    </Box>
  );
};

export default Carousel;

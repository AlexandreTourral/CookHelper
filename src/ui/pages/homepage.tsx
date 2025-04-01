import { Button, Typography, Box, Container, Grid, Card, CardContent, useMediaQuery, IconButton, Fade, Slide } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useState, useEffect } from "react";
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { theme } from "../theme";
import { AuthStore } from "../../store/UserStore";
import { useObservable } from "@ngneat/react-rxjs";

export function HomePage() {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [loaded, setLoaded] = useState(false);
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);
  const navigate = useNavigate();
  const [authState] = useObservable(AuthStore);
  const isAuthenticated = authState.user?.isConnected;

  useEffect(() => {
    setLoaded(true);
    
    const featuresObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFeaturesVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const testimonialObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTestimonialsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const featuresElement = document.getElementById('features-section');
    const testimonialElement = document.getElementById('testimonials-section');
    
    if (featuresElement) featuresObserver.observe(featuresElement);
    if (testimonialElement) testimonialObserver.observe(testimonialElement);
    
    return () => {
      if (featuresElement) featuresObserver.unobserve(featuresElement);
      if (testimonialElement) testimonialObserver.unobserve(testimonialElement);
    };
  }, []);

  const scrollToFeatures = () => {
    document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      title: "Planification Facile",
      description: "Planifiez tous vos repas de la semaine en quelques clics seulement",
      icon: <ScheduleIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    },
    {
      title: "Recettes Délicieuses",
      description: "Accédez à une collection de recettes variées et savoureuses",
      icon: <RestaurantIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    },
    {
      title: "Liste de Courses",
      description: "Générez automatiquement votre liste de courses à partir de votre menu",
      icon: <LocalGroceryStoreIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    },
    {
      title: "Favoris",
      description: "Enregistrez vos recettes préférées pour y accéder rapidement",
      icon: <FavoriteBorderIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
    }
  ];

  const testimonials = [
    {
      name: "Sophie M.",
      text: "WeeKooK a complètement transformé ma façon de cuisiner. Fini le stress du 'Qu'est-ce qu'on mange ce soir?'!",
      role: "Mère de famille"
    },
    {
      name: "Thomas L.",
      text: "Grâce à WeeKooK, j'économise du temps et de l'argent. Mes courses sont optimisées et je ne gaspille plus rien.",
      role: "Jeune actif"
    },
    {
      name: "Marie D.",
      text: "Simple et intuitif! J'adore pouvoir planifier ma semaine et découvrir de nouvelles recettes en même temps.",
      role: "Étudiante"
    }
  ];

  return (
    <Box sx={{ overflowX: 'hidden' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.light}30, ${theme.palette.secondary.light}30)`,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          pt: 8,
          pb: 4
        }}
      >
        <Container maxWidth="lg">
          <Fade in={loaded} timeout={1000}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    fontSize: isMobile ? '2.5rem' : '3.5rem',
                    backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Planifiez vos repas en toute simplicité
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    color: theme.palette.text.secondary,
                    fontWeight: 400
                  }}
                >
                  Gagnez du temps, réduisez le gaspillage et simplifiez votre quotidien avec WeeKooK
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Link to="/SignUp" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      size="large"
                      sx={{
                        py: 1.5,
                        px: 4,
                        borderRadius: 2,
                        fontWeight: 600,
                        boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 6px 20px rgba(0,118,255,0.23)'
                        }
                      }}
                    >
                      Commencer Gratuitement
                    </Button>
                  </Link>
                  {isAuthenticated ? (
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={() => navigate('/weekook/dashboard')}
                      sx={{
                        py: 1.5,
                        px: 4,
                        borderRadius: 2,
                        fontWeight: 600,
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          borderColor: theme.palette.primary.main,
                          backgroundColor: 'transparent'
                        }
                      }}
                    >
                      Accéder au Dashboard
                    </Button>
                  ) : (
                    <Link to="/LogIn" style={{ textDecoration: "none" }}>
                      <Button
                        variant="outlined"
                        size="large"
                        sx={{
                          py: 1.5,
                          px: 4,
                          borderRadius: 2,
                          fontWeight: 600,
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            borderColor: theme.palette.primary.main,
                            backgroundColor: 'transparent'
                          }
                        }}
                      >
                        Se Connecter
                      </Button>
                    </Link>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  component="img"
                  src="/assets/meal_plan.png"
                  alt="Planification de repas"
                  sx={{
                    width: '100%',
                    maxWidth: 550,
                    height: 'auto',
                    display: 'block',
                    mx: 'auto',
                    borderRadius: 4,
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    transform: isMobile ? 'none' : 'perspective(1000px) rotateY(-5deg)',
                    transition: 'all 0.5s ease'
                  }}
                />
              </Grid>
            </Grid>
          </Fade>
          
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 10
            }}
          >
            <IconButton
              onClick={scrollToFeatures}
              sx={{
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 20%, 50%, 80%, 100%': {
                    transform: 'translateY(0)'
                  },
                  '40%': {
                    transform: 'translateY(-20px)'
                  },
                  '60%': {
                    transform: 'translateY(-10px)'
                  }
                }
              }}
            >
              <KeyboardArrowDownIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Box 
        id="features-section"
        sx={{
          py: 10,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              mb: 6,
              fontWeight: 700,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 2
              }
            }}
          >
            Pourquoi choisir WeeKooK?
          </Typography>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Fade in={featuresVisible} timeout={(index + 1) * 500}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 4,
                      transition: 'all 0.3s ease',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.1)'
                      }
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                      <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                      <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                        {feature.title}
                      </Typography>
                      <Typography color="textSecondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box
        id="testimonials-section"
        sx={{
          py: 10,
          background: `linear-gradient(135deg, ${theme.palette.primary.light}20, ${theme.palette.secondary.light}20)`,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            align="center"
            sx={{
              mb: 6,
              fontWeight: 700,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 80,
                height: 4,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 2
              }
            }}
          >
            Ce que nos utilisateurs disent
          </Typography>

          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Slide direction="up" in={testimonialsVisible} timeout={(index + 1) * 500}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
                      position: 'relative',
                      overflow: 'visible',
                      '&:before': {
                        content: '""',
                        position: 'absolute',
                        top: -20,
                        left: 20,
                        fontSize: '4rem',
                        color: theme.palette.primary.main,
                        opacity: 0.2,
                        fontFamily: 'serif'
                      }
                    }}
                  >
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                        "{testimonial.text}"
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {testimonial.role}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 10,
          backgroundColor: theme.palette.background.default,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Fade in={true} timeout={1000}>
            <Box>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  mb: 3,
                  fontWeight: 700
                }}
              >
                Prêt à simplifier vos repas?
              </Typography>
              <Typography
                variant="h6"
                component="p"
                sx={{
                  mb: 5,
                  color: theme.palette.text.secondary,
                  mx: 'auto',
                  maxWidth: 700
                }}
              >
                Rejoignez des milliers d'utilisateurs qui ont transformé leur quotidien grâce à WeeKooK. Commencez dès aujourd'hui!
              </Typography>
              <Link to="/SignUp" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 5,
                    borderRadius: 2,
                    fontWeight: 600,
                    boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(0,118,255,0.23)'
                    }
                  }}
                >
                  S'inscrire Gratuitement
                </Button>
              </Link>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
}